import { useDocument } from "@nandorojo/swr-firestore";
import { PostContext } from "../../Context";
import { IPost } from "../../Firebase/types";
import { DisplayError } from "../Error";
import { RingLoader } from "../Globals";
import { RegularPost } from "../Post";

const PostModal = ({ postId }: { postId: string }) => {
  const { data, loading, error } = useDocument<IPost>(`posts/${postId}`, {
    listen: true,
  });

  if (error) return <DisplayError />;

  if (loading) return <RingLoader />;

  return data && data.exists ? (
    <PostContext.Provider value={data}>
      <RegularPost modal />
    </PostContext.Provider>
  ) : null;
};

export default PostModal;
