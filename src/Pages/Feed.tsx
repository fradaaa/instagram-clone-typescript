import { useCollection } from "@nandorojo/swr-firestore";
import { useCallback, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import { DisplayError } from "../Components/Error";
import FeedSuggestions from "../Components/Feed/FeedSuggestions";
import { RingLoader } from "../Components/Globals";
import { FeedPost } from "../Components/Post";
import { IPost } from "../Firebase/types";
import { useAuthUser, useFirebase, usePagination } from "../Hooks";
import { FeedContainer, TimeLineContainer } from "./style";

const Feed = () => {
  const authUser = useAuthUser();
  const { data, error } = useCollection(
    authUser ? `following/${authUser.uid}/refs` : null
  );

  if (error) return <DisplayError />;

  if (!authUser) return <Redirect to="/accounts/signup" />;

  return (
    <FeedContainer>
      {data ? <Timeline ids={data.map((f) => f.id)} /> : null}
    </FeedContainer>
  );
};

let shouldRevalidate = true;

const Timeline = ({ ids }: { ids: string[] }) => {
  const firebase = useFirebase();
  const node = useRef<HTMLDivElement>(null);
  const { data, error, mutate, loading } = useCollection<IPost>(
    "/posts",
    {
      limit: 5,
      where: ["ownerId", "in", ids],
      orderBy: ["timestamp", "desc"],
      ignoreFirestoreDocumentSnapshotField: false,
    },
    {
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      refreshInterval: 0,
      revalidateOnMount: shouldRevalidate || false,
    }
  );

  useEffect(() => {
    document.title = "Instagram Clone";
  });

  const paginate = useCallback(async () => {
    if (!data?.length) return;

    let ref = firebase.db.collection("posts");

    const startAfterDocument = data[data.length - 1].__snapshot;

    const moreDocs = await ref
      .orderBy("timestamp", "desc")
      .where("ownerId", "in", ids)
      .startAfter(startAfterDocument)
      .limit(5)
      .get()
      .then((d) => {
        return d.docs.map((doc) => ({
          ...(doc.data() as IPost),
          id: doc.id,
          __snapshot: doc,
        }));
      });

    await mutate((state) => [...state!, ...moreDocs], false);
    shouldRevalidate = false;
  }, [data, firebase, mutate, ids]);

  usePagination({ targetRef: node, callback: paginate });

  if (error) return <DisplayError />;

  if (loading) return <RingLoader />;

  return (
    <>
      <TimeLineContainer>
        {data?.map(({ id }) => (
          <FeedPost key={id} postId={id} />
        ))}
        <div ref={node}></div>
      </TimeLineContainer>
      <FeedSuggestions />
    </>
  );
};

export default Feed;
