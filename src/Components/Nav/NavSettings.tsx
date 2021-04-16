import { AiOutlineHeart } from "react-icons/ai";
import { BiCog } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router";
import { useAuthProfile, useFirebase } from "../../Hooks";
import Dropdown from "../Dropdown/Dropdown";
import { RoundProfileImage } from "../Globals";
import {
  NavSettingsContainer,
  OptionIcon,
  OptionText,
  SettingsLink,
  SettingsOption,
} from "./style";

const NavSettings = () => {
  const authProfile = useAuthProfile();
  const firebase = useFirebase();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await firebase.auth.signOut();
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    { to: `/${authProfile?.userName}`, icon: <CgProfile />, text: "Profile" },
    {
      to: `/${authProfile?.userName}/saved`,
      icon: <AiOutlineHeart />,
      text: "Saved",
    },
    {
      to: "/accounts/edit/profile",
      icon: <BiCog />,
      text: "Settings",
    },
  ];

  return (
    <Dropdown
      icon={
        <RoundProfileImage
          width="25"
          height="25"
          src={authProfile?.photoURL}
          userName={authProfile?.userName!}
        />
      }
    >
      <NavSettingsContainer>
        {options.map(({ to, text, icon }, index) => (
          <SettingsOption key={index}>
            <SettingsLink to={to}>
              <OptionIcon>{icon}</OptionIcon>
              <OptionText>{text}</OptionText>
            </SettingsLink>
          </SettingsOption>
        ))}
        <SettingsOption onClick={handleSignOut}>
          <OptionText padding>Sign Out</OptionText>
        </SettingsOption>
      </NavSettingsContainer>
    </Dropdown>
  );
};

export default NavSettings;
