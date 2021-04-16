import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexRow } from "./Flex";

const ring = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

export const RingLoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CirclesContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;

  & div {
    position: absolute;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: ${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: transparent transparent transparent transparent;
    border-top-color: ${({ theme }) => theme.primary};
  }

  & div:nth-of-type(1) {
    animation-delay: -0.45s;
  }
  & div:nth-of-type(2) {
    animation-delay: -0.3s;
  }
  & div:nth-of-type(3) {
    animation-delay: -0.15s;
  }
`;

export const Circle = styled.div`
  border-color: ${({ theme }) =>
    `${theme.onSurface} transparent transparent transparent`};
  width: 50px;
  height: 50px;
  margin: 5px;
  border-width: 5px;
`;

export const IconLoaderContainer = styled(FlexRow)`
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: ${({ theme }) => theme.onSurface};
  background-color: ${({ theme }) => theme.surface};

  & svg {
    display: block;
    height: 100px;
    width: 100px;
    opacity: 0.6;
  }
`;

const spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`;

export const LazyPreloader = styled(FlexRow)`
  width: 100%;
  height: 100%;
  position: absolute;
  width: 42px;
  height: 42px;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
  transform-origin: 50%;
  animation: ${spin} 1s infinite linear;
  box-sizing: border-box;
  border: ${({ theme }) => `4px solid ${theme.onSurface}`};
  border-radius: 50%;
  border-top-color: transparent;
`;
