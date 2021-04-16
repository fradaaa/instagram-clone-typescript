import { useModal, usePost } from "../../Hooks";
import { Modal, PostModal } from "../Modals";
import PostButtons from "./PostButtons";
import PostStats from "./PostStats";
import {
  CommentsLink,
  CommentsLinkContainer,
  PostFeedInfoContainer,
} from "./style";

const PostFeedInfo = () => {
  const { id } = usePost();
  const { show, openModal, closeModal } = useModal();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal();
  };

  return (
    <PostFeedInfoContainer>
      <PostButtons />
      <PostStats />
      <CommentsLinkContainer>
        <CommentsLink onClick={handleClick} to={`/p/${id}`}>
          See comments
        </CommentsLink>
      </CommentsLinkContainer>
      {show && (
        <Modal
          isOpen={show}
          contentLabel="Post Modal"
          onRequestClose={closeModal}
          post
        >
          <PostModal postId={id} />
        </Modal>
      )}
    </PostFeedInfoContainer>
  );
};

export default PostFeedInfo;
