import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexCol, FlexRow } from "../Globals";

export const StyledDropdown = styled(FlexRow)`
  justify-content: center;
  position: relative;
  height: 100%;
`;

export const DropdownIcon = styled(FlexRow)`
  justify-content: center;
  padding: 0 10px;
`;

const show = keyframes`
  from {
    opacity: 0.8;
    transform: translateY(-5%)
  }

  to {
    opacity: 1;
    transform: translateY(0%)
  }
`;

export const DropdownMenu = styled(FlexCol)`
  position: absolute;
  top: 45px;
  right: -10px;
  background-color: ${({ theme }) => theme.surface2};
  color: ${({ theme }) => theme.onSurface};
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  border-radius: var(--brsm);
  box-shadow: 0px 8px 16px 0px var(--border-color);
  white-space: nowrap;
  z-index: 10;
  overflow: hidden;
  animation: ${show} 0.1s ease;
  box-shadow: var(--bxshdw);
`;
