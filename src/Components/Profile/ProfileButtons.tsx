import { useAuthUser, useProfile } from "../../Hooks";
import { FollowButton, SendMessageButton } from "../Buttons";
import { ButtonsContainer } from "./style";

const ProfileButtons = () => {
  const { id } = useProfile();
  const authUser = useAuthUser();

  return (
    <ButtonsContainer>
      <FollowButton profileId={id} />
      {authUser && <SendMessageButton />}
    </ButtonsContainer>
  );
};

export default ProfileButtons;
