import { useModal, useProfile } from "../../Hooks";
import { Modal, ProfilesListModal } from "../Modals";
import { ItemContainer, Number, ProfileStatsContainer } from "./style";

type StatsItemProps = {
  number: number;
  type: "posts";
};

const StatsItem = ({ number, type }: StatsItemProps) => {
  return (
    <ItemContainer>
      <Number>{number}</Number>
      {type}
    </ItemContainer>
  );
};

type ModalStatsItemProps = {
  number: number;
  type: "followers" | "following";
};

const ModalStatsItem = ({ number, type }: ModalStatsItemProps) => {
  const { id } = useProfile();
  const { show, openModal, closeModal } = useModal();

  return (
    <>
      <ItemContainer pointer onClick={openModal}>
        <Number>{number}</Number>
        {type}
      </ItemContainer>
      {show && (
        <Modal
          isOpen={show}
          contentLabel={`${type} Modal`}
          onRequestClose={closeModal}
        >
          <ProfilesListModal closeModal={closeModal} type={type} id={id} />
        </Modal>
      )}
    </>
  );
};

const ProfileStats = () => {
  const { postsNumber, followingNumber, followersNumber } = useProfile();

  return (
    <ProfileStatsContainer>
      <StatsItem number={postsNumber} type="posts" />
      <ModalStatsItem number={followersNumber} type="followers" />
      <ModalStatsItem number={followingNumber} type="following" />
    </ProfileStatsContainer>
  );
};

export default ProfileStats;
