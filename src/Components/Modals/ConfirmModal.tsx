import { PostMenu, PostMenuItem } from "./style";

type Props = {
  confirmText: string;
  confirmAction: () => void;
  closeModal: () => void;
};

const ConfirmModal = ({ confirmText, confirmAction, closeModal }: Props) => {
  return (
    <PostMenu>
      <PostMenuItem onClick={confirmAction}>{confirmText}</PostMenuItem>
      <PostMenuItem onClick={closeModal}>Cancel</PostMenuItem>
    </PostMenu>
  );
};

export default ConfirmModal;
