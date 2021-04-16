import {
  DialogLink,
  StyledCancelButton,
  StyledMessageHeader,
  StyledMessageHeaderText,
} from "../style";
import { MdClear } from "react-icons/md";
import { useFirebase, useProfile } from "../../../Hooks";
import { useEffect, useState } from "react";

const SendMessageHeader = ({ closeModal }: { closeModal: () => void }) => {
  const firebase = useFirebase();
  const { id } = useProfile();
  const [dialogId, setDialogId] = useState<string | null>(null);

  useEffect(() => {
    const loadDialog = async () => {
      setDialogId(await firebase.getDialogId(id));
    };

    loadDialog();
  }, [firebase, id]);

  return (
    <StyledMessageHeader>
      <StyledMessageHeaderText>New Message</StyledMessageHeaderText>
      {dialogId && (
        <DialogLink to={`/direct/${dialogId}`}>Open full dialog</DialogLink>
      )}
      <StyledCancelButton
        width="20"
        height="20"
        aria-label="Close modal"
        onClick={closeModal}
      >
        <MdClear />
      </StyledCancelButton>
    </StyledMessageHeader>
  );
};

export default SendMessageHeader;
