import { useDocument } from "@nandorojo/swr-firestore";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuthUser, useFirebase, useModal } from "../../Hooks";
import { LoginForm } from "../Forms";
import { Modal } from "../Modals";
import { IconButton } from "./style";

const LikeButton = React.memo(({ postId }: { postId: string }) => {
  const authUser = useAuthUser();
  const [disabled, setDisabled] = useState(false);
  const { show, openModal, closeModal } = useModal();
  const { removeLike, addLike } = useFirebase();
  const { data } = useDocument(
    authUser ? `/postLikes/${postId}/refs/${authUser.uid}` : null,
    { listen: true }
  );

  const handleClick = async () => {
    setDisabled(true);
    try {
      if (data?.exists) {
        await removeLike(postId);
      } else {
        await addLike(postId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  return data ? (
    <IconButton
      onClick={handleClick}
      disabled={disabled}
      width="25"
      height="25"
      aria-label="Like"
    >
      {data.exists ? <AiFillHeart fill="#ed4956" /> : <AiOutlineHeart />}
    </IconButton>
  ) : authUser ? null : (
    <>
      <IconButton onClick={openModal} width="25" height="25" aria-label="Like">
        <AiOutlineHeart />
      </IconButton>
      {show && (
        <Modal
          contentLabel="Login modal"
          isOpen={show}
          onRequestClose={closeModal}
        >
          <LoginForm />
        </Modal>
      )}
    </>
  );
});

export default LikeButton;
