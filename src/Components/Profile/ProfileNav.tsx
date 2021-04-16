import { BsBookmark, BsGrid3X3 } from "react-icons/bs";
import { useIsOwner, useProfile } from "../../Hooks";
import { ProfileNavContainer, ProfileNavLink } from "./style";

const ProfileNav = () => {
  const { userName, id } = useProfile();
  const isOwner = useIsOwner(id);

  return (
    <ProfileNavContainer>
      <ProfileNavLink to={`/${userName}`}>
        <BsGrid3X3 />
        posts
      </ProfileNavLink>
      {isOwner && (
        <ProfileNavLink to={`/${userName}/saved`}>
          <BsBookmark />
          saved
        </ProfileNavLink>
      )}
    </ProfileNavContainer>
  );
};

export default ProfileNav;
