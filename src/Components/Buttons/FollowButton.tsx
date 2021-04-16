import { useDocument } from "@nandorojo/swr-firestore";
import React, { useState } from "react";
import { useAuthUser, useFirebase, useModal } from "../../Hooks";
import { LoginForm } from "../Forms";
import { Modal } from "../Modals";
import { Button } from "./style";

type FollowButtonProps = {
  profileId: string;
};

const FollowButton = React.memo(({ profileId }: FollowButtonProps) => {
  const authUser = useAuthUser();
  const [disabled, setDisabled] = useState(false);
  const { show, openModal, closeModal } = useModal();
  const { removeFollow, addFollow } = useFirebase();
  const { data } = useDocument(
    authUser ? `/following/${authUser.uid}/refs/${profileId}` : null,
    {
      listen: true,
    }
  );

  const handleClick = async () => {
    setDisabled(true);
    try {
      if (data?.exists) {
        await removeFollow(profileId);
      } else {
        await addFollow(profileId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  return data ? (
    <Button disabled={disabled} onClick={handleClick}>
      {data.exists ? "Unfollow" : "Follow"}
    </Button>
  ) : authUser ? null : (
    <>
      <Button onClick={openModal}>Follow</Button>
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

export default FollowButton;
