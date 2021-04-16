import styled from "@emotion/styled";
import { FlexRow, StyledLink } from "../Globals";

export const StyledFooter = styled.footer`
  margin-top: auto;
  height: 50px;
  background-color: ${({ theme }) => theme.surface};
`;

export const FooterContainer = styled(FlexRow)`
  justify-content: space-between;
  max-width: 1010px;
  height: 100%;
  margin: 0px auto;
  padding: 0;
`;

export const FooterNav = styled(FlexRow)`
  height: 100%;
`;

export const FooterLink = styled(StyledLink)`
  padding-right: 10px;
  font-size: 13px;

  &:last-of-type {
    padding-right: 0;
  }
`;

export const Copyright = styled.span`
  font-size: 11px;
  font-weight: 300;
  white-space: nowrap;
  color: ${({ theme }) => theme.onSurface};
`;
