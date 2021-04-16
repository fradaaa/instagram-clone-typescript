import { useProfile } from "../../../Hooks";
import { RoundProfileImage } from "../../Globals";
import {
  SendMessageProfileContainer,
  SendMessageProfileInfo,
  SendMessageProfileUserName,
} from "../style";

const SendMessageProfile = () => {
  const { photoURL, userName } = useProfile();

  return (
    <SendMessageProfileContainer>
      <SendMessageProfileInfo>
        <RoundProfileImage
          width="30"
          height="30"
          src={photoURL}
          userName={userName}
        />
        <SendMessageProfileUserName>{userName}</SendMessageProfileUserName>
      </SendMessageProfileInfo>
    </SendMessageProfileContainer>
  );
};

export default SendMessageProfile;
