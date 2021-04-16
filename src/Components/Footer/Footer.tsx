import {
  Copyright,
  FooterContainer,
  FooterLink,
  FooterNav,
  StyledFooter,
} from "./style";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterNav>
          <FooterLink to="">About</FooterLink>
          <FooterLink to="/">Help</FooterLink>
          <FooterLink to="/">Privacy</FooterLink>
        </FooterNav>
        <Copyright>Frada &copy; 2021</Copyright>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
