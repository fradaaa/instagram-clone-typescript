import { IComment } from "../../Firebase/types";
import PostButtons from "./PostButtons";
import PostForm from "./PostForm";
import PostStats from "./PostStats";
import { PostInteractionContainer } from "./style";

type PostInteractionProps = {
  add: (data: IComment | IComment[]) => Promise<void> | null;
};

const PostInteraction = ({ add }: PostInteractionProps) => {
  return (
    <PostInteractionContainer>
      <PostButtons />
      <PostStats />
      <PostForm add={add} />
    </PostInteractionContainer>
  );
};

export default PostInteraction;
