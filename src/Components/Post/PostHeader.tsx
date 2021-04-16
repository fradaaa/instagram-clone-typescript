import { useDocument } from "@nandorojo/swr-firestore";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IProfile } from "../../Firebase/types";
import { useIsOwner, useModal, usePost } from "../../Hooks";
import { FollowButton } from "../Buttons";
import { IconButton } from "../Buttons/style";
import { DisplayError } from "../Error";
import { RoundProfileImage } from "../Globals";
import { Modal, PostMenuModal } from "../Modals";
import {
  PostHeaderContainer,
  PostHeaderMenuContainer,
  PostHeaderUserName,
  PostProfileLink,
} from "./style";

const PostHeaderMenu = () => {
  const { show, openModal, closeModal } = useModal();

  return (
    <PostHeaderMenuContainer>
      <IconButton
        onClick={openModal}
        width="25"
        height="25"
        aria-label="More options"
      >
        <IoEllipsisHorizontalSharp />
      </IconButton>
      {show && (
        <Modal
          isOpen={show}
          contentLabel="Post Menu Modal"
          onRequestClose={closeModal}
        >
          <PostMenuModal closeModal={closeModal} />
        </Modal>
      )}
    </PostHeaderMenuContainer>
  );
};

const PostHeader = () => {
  const { ownerId } = usePost();
  const { data, error } = useDocument<IProfile>(`users/${ownerId}`);
  const isOwner = useIsOwner(ownerId);

  if (error) return <DisplayError />;

  return (
    <PostHeaderContainer>
      {data ? (
        <>
          <Link
            to={`/${data.userName}`}
            aria-label={`${data.userName}'s profile`}
          >
            <RoundProfileImage
              width="30"
              height="30"
              src={data.photoURL}
              userName={data.userName}
            />
          </Link>
          <PostHeaderUserName>
            <PostProfileLink to={`/${data.userName}`}>
              {data.userName}
            </PostProfileLink>
          </PostHeaderUserName>
          {!isOwner && <FollowButton profileId={data.id} />}
          <PostHeaderMenu />
        </>
      ) : null}
    </PostHeaderContainer>
  );
};

export default PostHeader;
