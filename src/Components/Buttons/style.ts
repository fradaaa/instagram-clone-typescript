import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: var(--brsm);
  padding: 10px;
  color: ${({ theme }) => theme.onPrimary};
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  transition: color 0.1s ease-in, background-color 0.3s ease 0s;

  &:hover {
    color: ${({ theme }) => theme.onPrimaryVariant};
    background-color: ${({ theme }) => theme.primaryVariant};
  }

  &:active {
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.onPrimary};
    background-color: ${({ theme }) => theme.primary};
    opacity: 0.3;
  }
`;

type IconButtonProps = {
  width: string;
  height: string;
  "aria-label": string;
};

export const IconButton = styled.button<IconButtonProps>`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.onSurface};
  transition: color 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  & svg {
    display: block;
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
  }
`;

const spinner = keyframes`
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn)
  }
`;

type ButtonProps = {
  isProcessing?: boolean;
};

export const ButtonWithSpinner = styled(Button)<ButtonProps>`
  position: relative;
  width: 80px;
  height: 30px;

  &::after {
    ${({ isProcessing }) =>
      isProcessing && {
        content: '""',
        position: "absolute",
        width: "16px",
        height: "16px",
        inset: 0,
        margin: "auto",
        border: "3px solid transparent",
        borderRadius: "50%",
        borderTopColor: "white",
        animation: `${spinner} .8s ease infinite`,
      }}
  }
`;
