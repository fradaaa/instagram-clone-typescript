import ProfileInfo from "./ProfileInfo";
import ProfilePhoto from "./ProfilePhoto";
import { ProfileStats } from "./ProfileStats";
import ProfileUserName from "./ProfileUserName";
import { HeaderSection, ProfileHeaderContainer } from "./style";

const ProfileHeader = () => {
  return (
    <ProfileHeaderContainer as="header">
      <ProfilePhoto />
      <HeaderSection>
        <ProfileUserName />
        <ProfileStats />
        <ProfileInfo />
      </HeaderSection>
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;
