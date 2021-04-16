import { useProfile } from "../../Hooks";
import { FullName, ProfileInfoContainer, UserInfo } from "./style";

const ProfileInfo = () => {
  const { fullName, userInformation } = useProfile();

  return (
    <ProfileInfoContainer>
      <FullName>{fullName}</FullName>
      <br />
      {userInformation && <UserInfo>{userInformation}</UserInfo>}
    </ProfileInfoContainer>
  );
};

export default ProfileInfo;
