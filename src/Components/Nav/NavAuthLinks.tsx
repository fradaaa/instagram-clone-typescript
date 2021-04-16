import { ChangeThemeButton } from "../../Theme";
import { AuthLink, NavAuthLinksContainer } from "./style";

const NavAuthLinks = () => {
  return (
    <NavAuthLinksContainer>
      <ChangeThemeButton />
      <AuthLink to="/">Log In</AuthLink>
      <AuthLink to="/">Sign Up</AuthLink>
    </NavAuthLinksContainer>
  );
};

export default NavAuthLinks;
