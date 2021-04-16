import { useDocument } from "@nandorojo/swr-firestore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { DisplayError } from "../Components/Error";
import { RingLoader } from "../Components/Globals";
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
    if (data) {
      document.title = `Instagram Photo • ${data.timestamp
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
    <h1>No Such Post</h1>
  );
};

export default Post;
