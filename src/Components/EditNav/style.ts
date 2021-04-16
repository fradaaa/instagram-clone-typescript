import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FlexCol, FlexRow } from "../Globals";

export const EditNavContainer = styled(FlexCol)`
  background-color: ${({ theme }) => theme.surface2};
  flex: 1;
  border-right: ${({ theme }) => `1px solid ${theme.lightBorder}`};
`;

type NavItemProps = {
  active: boolean;
};

export const EditNavItemContainer = styled(FlexRow)<NavItemProps>`
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  color: ${({ theme, active }) => (active ? theme.onPrimary : theme.onSurface)};
  background-color: ${({ theme, active }) =>
    active ? theme.primary : theme.surface3};
  transition: color 0.1s ease-in, background-color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme, active }) =>
      active ? theme.primary : theme.surface4};
    color: ${({ theme, active }) => !active && theme.primary};
  }
`;

export const EditNavLink = styled(Link)`
  padding: 15px;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
`;
