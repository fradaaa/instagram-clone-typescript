import { SendMessageContainer } from "../style";
import SendMessageForm from "./SendMessageForm";
import SendMessageHeader from "./SendMessageHeader";
import SendMessageProfile from "./SendMessageProfile";

const SendMessageModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <SendMessageContainer>
      <SendMessageHeader closeModal={closeModal} />
      <SendMessageProfile />
      <SendMessageForm closeModal={closeModal} />
    </SendMessageContainer>
  );
};

export default SendMessageModal;
