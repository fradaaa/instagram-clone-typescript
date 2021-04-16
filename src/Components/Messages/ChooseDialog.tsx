import { FlexCol } from "../Globals";
import {
  ChooseDialogContainer,
  ChooseDialogMainText,
  ChooseDialogSubText,
} from "./style";
import { BsEnvelope } from "react-icons/bs";

const ChooseDialog = () => {
  return (
    <ChooseDialogContainer>
      <FlexCol>
        <BsEnvelope />
      </FlexCol>
      <ChooseDialogMainText>Your messages</ChooseDialogMainText>
      <ChooseDialogSubText>
        Send private photos and messages to a friend.
      </ChooseDialogSubText>
    </ChooseDialogContainer>
  );
};

export default ChooseDialog;
