import { useAuthProfile } from "../../Hooks";
import { RoundProfileImage } from "../Globals";
import { FormImageHeaderContainer, FormImageHeaderUserName } from "./style";

const ProfileImageHeader = () => {
  const { userName, photoURL } = useAuthProfile()!;

  return (
    <FormImageHeaderContainer>
      <RoundProfileImage
        width="40"
        height="40"
        src={photoURL}
        userName={userName}
      />
      <FormImageHeaderUserName>{userName}</FormImageHeaderUserName>
    </FormImageHeaderContainer>
  );
};

export default ProfileImageHeader;
