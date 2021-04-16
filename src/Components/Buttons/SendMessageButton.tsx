import { useModal } from "../../Hooks";
import { Modal, SendMessageModal } from "../Modals";
import { Button } from "./style";

const SendMessageButton = () => {
  const { show, openModal, closeModal } = useModal();

  return (
    <>
      <Button onClick={openModal} type="button">
        Send Message
      </Button>
      {show && (
        <Modal
          contentLabel="Send message modal"
          isOpen={show}
          onRequestClose={closeModal}
        >
          <SendMessageModal closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default SendMessageButton;
