import { AiOutlineHome } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { ImBubbles4 } from "react-icons/im";
import { ChangeThemeButton } from "../../Theme";
import NavSettings from "./NavSettings";
import { NavLink, NavLinkItem, NavLinksContainer } from "./style";

const NavLinks = () => {
  return (
    <NavLinksContainer>
      <NavLinkItem>
        <NavLink to="/" aria-label="Home">
          <AiOutlineHome />
        </NavLink>
      </NavLinkItem>
      <NavLinkItem>
        <NavLink to="/direct" aria-label="Direct">
          <ImBubbles4 />
        </NavLink>
      </NavLinkItem>
      <NavLinkItem>
        <NavLink to="/accounts/upload" aria-label="Upload">
          <FiUpload />
        </NavLink>
      </NavLinkItem>
      <NavLinkItem>
        <ChangeThemeButton />
      </NavLinkItem>
      <NavLinkItem>
        <NavSettings />
      </NavLinkItem>
    </NavLinksContainer>
  );
};

export default NavLinks;
