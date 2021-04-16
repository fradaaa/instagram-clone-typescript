import { AiFillGithub } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { useAuthUser } from "../../Hooks";
import NavAuthLinks from "./NavAuthLinks";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import {
  ExternalLink,
  NavContainer,
  NavItem,
  NavLogoLink,
  StyledNav,
} from "./style";

const Nav = () => {
  const authUser = useAuthUser();

  return (
    <StyledNav>
      <NavContainer>
        <NavItem>
          <NavLogoLink to="/" aria-label="Logo">
            <FaInstagram />
          </NavLogoLink>
          <ExternalLink
            href="https://github.com/fradaaa"
            aria-label="Github"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub />
          </ExternalLink>
        </NavItem>
        <NavItem>
          <NavSearch />
        </NavItem>
        <NavItem>{authUser ? <NavLinks /> : <NavAuthLinks />}</NavItem>
      </NavContainer>
    </StyledNav>
  );
};

export default Nav;
