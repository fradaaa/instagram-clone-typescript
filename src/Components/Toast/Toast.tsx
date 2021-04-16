import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";
import DismissButton from "./DismissButton";

const StyledToastContainer = styled(ToastContainer)`
  /** Classes for the displayed toast **/
  .Toastify__toast {
    justify-content: center;
    position: relative;
    font-size: 14px;
    width: 300px;
    height: 100px;
    border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
    border-radius: var(--brsm);
    background-color: ${({ theme }) => theme.surface2};
    color: ${({ theme }) => theme.onSurface};
    padding: 5px;
    overflow: hidden;
    margin-bottom: 15px;
    z-index: 150;
    box-shadow: var(--bxshdw);
    transition: color 0.1s ease-in, background-color 0.1s ease-in;
    font-weight: 600;

    &:hover {
      background-color: ${({ theme }) => theme.surface3};
      color: ${({ theme }) => theme.primary};
    }
  }

  /** Classes for the progress bar **/
  .Toastify__progress-bar {
    background: ${({ theme }) => theme.primary};
  }
`;

const Toast = () => {
  return (
    <StyledToastContainer position="bottom-right" closeButton={DismissButton} />
  );
};

export default Toast;
