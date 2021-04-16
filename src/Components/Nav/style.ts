import styled from "@emotion/styled";
import { IconButton } from "../Buttons/style";
import { FlexCol, FlexRow, StyledInput, StyledLink } from "../Globals";

export const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  height: 50px;
  background-color: ${({ theme }) => theme.surface};
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  z-index: 5;
`;

export const NavContainer = styled(FlexRow)`
  height: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

export const NavItem = styled(FlexRow)`
  height: 100%;
  flex: 1;

  &:nth-of-type(2) {
    justify-content: center;
  }

  &:last-of-type {
    justify-content: flex-end;
  }
`;

export const NavLogoLink = styled(StyledLink)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  & svg {
    display: block;
    width: 30px;
    height: 30px;
  }
`;

export const ExternalLink = styled.a`
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.1s ease-in;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  :link {
    color: ${({ theme }) => theme.onSurface};
  }

  :visited {
    color: ${({ theme }) => theme.onSurface};
  }

  :focus {
  }

  :hover {
    color: ${({ theme }) => theme.primary};
  }

  :active {
  }

  & svg {
    display: block;
    width: 30px;
    height: 30px;
  }
`;

export const NavSearchContainer = styled(FlexRow)`
  position: relative;
  justify-content: center;
  width: 80%;
  height: 100%;
  background-color: ${({ theme }) => theme.surface};
`;

export const EmptySearch = styled(FlexRow)`
  justify-content: center;
  color: ${({ theme }) => theme.onSurface};
  font-size: 12px;
  padding: 10px;
`;

export const SearchIcon = styled.label`
  position: absolute;
  left: 5px;
  color: ${({ theme }) => theme.primary};
`;

export const SearchClearButton = styled(IconButton)`
  position: absolute;
  right: 5px;
`;

export const SearchInput = styled(StyledInput)`
  width: 100%;
  height: 60%;
  text-align: center;
  background-color: ${({ theme }) => theme.surface2};
`;

export const SearchResultsContainer = styled(FlexCol)`
  position: absolute;
  top: 50px;
  width: 100%;
  overflow: hidden;
  border-radius: var(--brmd);
  background-color: ${({ theme }) => theme.surface2};
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  box-shadow: var(--bxshdw);
`;

export const SearchItem = styled(FlexRow)`
  cursor: pointer;
  width: 100%;
  padding: 10px 5px;
  color: ${({ theme }) => theme.onSurface};
  background-color: ${({ theme }) => theme.surface2};
  transition: color 0.1s ease-in, background-color 0.1s ease-in;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};

  &:hover {
    background-color: ${({ theme }) => theme.surface3};
    color: ${({ theme }) => theme.primary};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

export const SearchItemPhoto = styled(FlexRow)`
  flex: 1;
  justify-content: center;
`;

export const SearchItemUserName = styled(FlexRow)`
  font-size: 13px;
  margin-left: 5px;
  flex: 5;
`;

export const NavLinksContainer = styled(FlexRow)`
  height: 100%;
`;

export const NavLinkItem = styled(FlexRow)`
  cursor: pointer;
  height: 100%;
  transition: background-color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.surface2};
  }
`;

export const NavLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;

  & svg {
    width: 25px;
    height: 25px;
  }
`;

export const NavSettingsContainer = styled(FlexCol)`
  width: 150px;
`;

export const SettingsOption = styled(FlexRow)`
  justify-content: center;
  font-size: 15px;
  color: ${({ theme }) => theme.onSurface};
  cursor: pointer;
  transition: background-color 0.1s ease-in, color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.surface3};
    color: ${({ theme }) => theme.primary};
  }
`;

export const SettingsLink = styled(StyledLink)`
  display: flex;
  padding: 10px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const OptionIcon = styled(FlexRow)`
  flex: 1;
  justify-content: center;

  & svg {
    display: block;
    width: 20px;
    height: 20px;
  }
`;

type OptionTextProps = {
  padding?: boolean;
};

export const OptionText = styled(FlexRow)<OptionTextProps>`
  height: 100%;
  flex: 3;
  padding: ${({ padding }) => padding && "10px 10px 10px 20px"};
`;

export const NavAuthLinksContainer = styled(FlexRow)`
  justify-content: center;
  height: 100%;
`;

export const AuthLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 15px;
  height: 100%;
  padding: 0 5px;
  transition: background-color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.surface2};
  }

  &:first-of-type {
    margin: 0;
  }
`;
