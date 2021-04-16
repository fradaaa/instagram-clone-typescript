import { useDocument } from "@nandorojo/swr-firestore";
import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useAuthUser, useFirebase, useModal } from "../../Hooks";
import { LoginForm } from "../Forms";
import { Modal } from "../Modals";
import { IconButton } from "./style";

const SaveButton = React.memo(({ postId }: { postId: string }) => {
  const authUser = useAuthUser();
  const [disabled, setDisabled] = useState(false);
  const { show, openModal, closeModal } = useModal();
  const { removePostFromSaved, addPostToSaved } = useFirebase();
  const { data } = useDocument(
    authUser ? `/savedPosts/${authUser.uid}/refs/${postId}` : null,
    {
      listen: true,
    }
  );

  const handleClick = async () => {
    setDisabled(true);
    try {
      if (data?.exists) {
        await removePostFromSaved(postId);
      } else {
        await addPostToSaved(postId);
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
      aria-label="Save"
    >
      {data.exists ? <BsBookmarkFill /> : <BsBookmark />}
    </IconButton>
  ) : authUser ? null : (
    <>
      <IconButton onClick={openModal} width="25" height="25" aria-label="Save">
        <BsBookmark />
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

export default SaveButton;
