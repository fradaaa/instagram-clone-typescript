import { usePost } from "../../Hooks";
import { LikeButton, SaveButton } from "../Buttons";
import { PostButtonsContainer } from "./style";

const PostButtons = () => {
  const { id } = usePost();

  return (
    <PostButtonsContainer>
      <LikeButton postId={id} />
      <SaveButton postId={id} />
    </PostButtonsContainer>
  );
};

export default PostButtons;
