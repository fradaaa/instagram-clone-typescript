import { useModal, usePost } from "../../Hooks";
import { Modal, ProfilesListModal } from "../Modals";
import { PostStatsContainer, PostStatsItem } from "./style";

const PostStats = () => {
  const { likesNumber, timestamp, id } = usePost();
  const { show, openModal, closeModal } = useModal();

  return (
    <PostStatsContainer>
      <PostStatsItem
        onClick={openModal}
      >{`${likesNumber} likes`}</PostStatsItem>
      <PostStatsItem>{timestamp.toDate().toLocaleDateString()}</PostStatsItem>
      {show && (
        <Modal
          isOpen={show}
          contentLabel="Likes Modal"
          onRequestClose={closeModal}
        >
          <ProfilesListModal type="postLikes" closeModal={closeModal} id={id} />
        </Modal>
      )}
    </PostStatsContainer>
  );
};

export default PostStats;
