import { MdClear } from "react-icons/md";
import { DismissIconButton } from "./style";

const DismissButton = ({ closeToast }: { closeToast: () => void }) => {
  return (
    <DismissIconButton
      width="20"
      height="20"
      aria-label="Close notification"
      onClick={closeToast}
    >
      <MdClear />
    </DismissIconButton>
  );
};

export default DismissButton;
