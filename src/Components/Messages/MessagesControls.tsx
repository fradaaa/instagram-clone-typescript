import { useCallback } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useModal } from "../../Hooks";
import { Modal, ConfirmModal } from "../Modals";
import { MessageControlButton, MessagesControlsContainer } from "./style";

type Props = {
  deleteSelected: () => void;
};

const MessagesControls = ({ deleteSelected }: Props) => {
  const { show, closeModal, openModal } = useModal();

  const confirmAction = useCallback(() => {
    deleteSelected();
    closeModal();
  }, [closeModal, deleteSelected]);

  return (
    <MessagesControlsContainer>
      <MessageControlButton
        width="25"
        height="25"
        aria-label="Delete message(s)"
        onClick={openModal}
      >
        <RiDeleteBin6Fill />
      </MessageControlButton>
      {show && (
        <Modal
          isOpen={show}
          onRequestClose={closeModal}
          contentLabel="Confirm modal"
        >
          <ConfirmModal
            confirmText="Delete Message(s)"
            closeModal={closeModal}
            confirmAction={confirmAction}
          />
        </Modal>
      )}
    </MessagesControlsContainer>
  );
};

export default MessagesControls;
