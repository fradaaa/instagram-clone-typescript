import styled from "@emotion/styled";
import { mq } from "../../Theme";
import { IconButton } from "../Buttons/style";
import { FlexCol, FlexRow, StyledInput } from "../Globals";

type ContainerProps = {
  show: boolean;
};

export const DialogsContainer = styled(FlexCol)<ContainerProps>`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex: 1;
  border-right: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  background-color: ${({ theme }) => theme.surface2};

  ${mq["sm"]} {
    display: flex;
  }
`;

type DialogProps = {
  active: boolean;
};

export const StyledDialog = styled(FlexRow)<DialogProps>`
  width: 100%;
  padding: 15px 5px;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  cursor: pointer;
  font-weight: 600;
  max-height: 70px;
  color: ${({ theme, active }) => (active ? theme.onPrimary : theme.onSurface)};
  background-color: ${({ theme, active }) =>
    active ? theme.primary : theme.surface3};
  transition: color 0.1s ease-in, background-color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme, active }) => !active && theme.surface4};
    color: ${({ theme, active }) => !active && theme.primary};
  }

  &:last-child {
    margin: 0;
  }
`;

export const DialogPhoto = styled(FlexRow)`
  flex: 1;
  justify-content: center;

  & img {
    cursor: pointer;
  }
`;

export const DialogInfo = styled(FlexRow)`
  flex: 4;
  align-items: center;
  margin-left: 10px;
`;

export const DialogUserName = styled.div`
  font-size: 13px;
  white-space: nowrap;
`;

export const FilterContainer = styled(FlexRow)`
  position: relative;
  color: ${({ theme }) => theme.primary};

  & svg {
    display: block;
    width: 25px;
    height: 25px;
  }
`;

export const FilterSearchIcon = styled.label`
  position: absolute;
  left: 5px;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 5px;
`;

export const FilterInput = styled(StyledInput)`
  width: 100%;
  text-align: center;
  padding: 15px 35px;
  background-color: ${({ theme }) => theme.surface2};
  border-radius: var(--brmd) 0 0 0;
  border-left: none;
  border-top: none;
  border-right: none;
`;
