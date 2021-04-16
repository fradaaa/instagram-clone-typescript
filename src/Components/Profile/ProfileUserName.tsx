import { useIsOwner, useProfile } from "../../Hooks";
import ProfileButtons from "./ProfileButtons";
import { UserName, UserNameContainer } from "./style";

const ProfileUserName = () => {
  const { userName, id } = useProfile();
  const isOwner = useIsOwner(id);

  return (
    <UserNameContainer>
      <UserName>{userName}</UserName>
      {!isOwner && <ProfileButtons />}
    </UserNameContainer>
  );
};

export default ProfileUserName;
