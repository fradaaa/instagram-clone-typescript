import { ChangeThemeButton } from "../../Theme";
import { AuthLink, NavAuthLinksContainer } from "./style";

const NavAuthLinks = () => {
  return (
    <NavAuthLinksContainer>
      <ChangeThemeButton />
      <AuthLink to="/accounts/login">Log In</AuthLink>
      <AuthLink to="/accounts/signup">Sign Up</AuthLink>
    </NavAuthLinksContainer>
  );
};

export default NavAuthLinks;
