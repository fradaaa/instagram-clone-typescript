import { useDocument } from "@nandorojo/swr-firestore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { DisplayError } from "../Components/Error";
import { NoDocument, RingLoader } from "../Components/Globals";
import { PostSuggestions, RegularPost } from "../Components/Post";
import { PostContext } from "../Context";
import { IPost } from "../Firebase/types";
import { PostContainer } from "./style";

type Params = {
  postId: string;
};

const Post = () => {
  const { postId } = useParams<Params>();
  const { data, error, loading } = useDocument<IPost>(`posts/${postId}`, {
    listen: true,
  });

  useEffect(() => {
    if (data && data.exists) {
      document.title = `Instagram Clone Photo • ${data.timestamp
        .toDate()
        .toLocaleString()}`;
    }
  }, [data]);

  if (error) return <DisplayError />;

  if (loading) return <RingLoader />;

  return data && data.exists ? (
    <PostContext.Provider value={data}>
      <PostContainer>
        <RegularPost />
        <PostSuggestions />
      </PostContainer>
    </PostContext.Provider>
  ) : (
    <NoDocument type="Post" />
  );
};

export default Post;
