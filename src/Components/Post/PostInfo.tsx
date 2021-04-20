import { useCollection } from "@nandorojo/swr-firestore";
import { IComment } from "../../Firebase/types";
import { usePost } from "../../Hooks";
import { DisplayError } from "../Error";
import { RingLoader } from "../Globals";
import PostButtons from "./PostButtons";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";
import PostInteraction from "./PostInteraction";
import PostStats from "./PostStats";
import { PostBottomInfoContainer, PostInfoContainer } from "./style";

const PostInfo = () => {
  const { id } = usePost();
  const { data, error, add } = useCollection<IComment>(
    `/postComments/${id}/refs`,
    {
      listen: false,
      orderBy: "timestamp",
    }
  );

  if (error) return <DisplayError />;

  return (
    <PostInfoContainer>
      <PostHeader />
      {data ? <PostComments data={data} /> : <RingLoader />}
      <PostInteraction add={add} />
    </PostInfoContainer>
  );
};

const PostBottomInfo = () => {
  return (
    <PostBottomInfoContainer>
      <PostButtons />
      <PostStats />
    </PostBottomInfoContainer>
  );
};

export { PostInfo, PostBottomInfo };
