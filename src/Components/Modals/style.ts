import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Form } from "formik";
import { Link } from "react-router-dom";
import { IconButton } from "../Buttons/style";
import { FlexCol, FlexRow, StyledLink, StyledTextArea } from "../Globals";

const show = keyframes`
  from {
    opacity: 0;
    scale: 1.2;
  }

  to {
    opacity: 1;
    scale: 1;
  }
`;

export const ModalOverlay = styled(FlexRow)`
  position: fixed;
  inset: 0;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.65) !important;
  z-index: 100;
  animation: ${show} 0.1s ease;
`;

type ModalContentProps = {
  post?: boolean;
};

export const ModalContent = styled(FlexCol)<ModalContentProps>`
  width: ${({ post }) => (post ? "960px" : "350px")};
  justify-content: center;
  align-items: center;
  border-radius: var(--brlg);
  background-color: ${({ theme }) => theme.surface};
  overflow: hidden;
  box-shadow: var(--bxshdw);
`;

export const PostMenu = styled(FlexCol)`
  height: 350px;
  width: 100%;
`;

export const PostMenuItem = styled(FlexRow)`
  cursor: pointer;
  justify-content: center;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  text-transform: capitalize;
  color: ${({ theme }) => theme.onSurface};
  overflow: hidden;
  transition: color 0.1s ease-in, background-color 0.1s ease-in;

  :hover {
    background-color: ${({ theme }) => theme.surface3};
    color: ${({ theme }) => theme.primary};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

export const ProfilesListContainer = styled(FlexCol)`
  height: 350px;
  width: 100%;
`;

export const ProfilesListHeader = styled(FlexRow)`
  justify-content: center;
  flex: 1;
  padding: 5px 0;
  color: ${({ theme }) => theme.onSurface};
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
`;

export const ProfilesListHeaderText = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: capitalize;
`;

export const ProfilesListContent = styled(FlexCol)`
  background-color: ${({ theme }) => theme.background};
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  align-items: center;
  padding: 0;
  flex: 9;
`;

export const StyledItem = styled(FlexRow)`
  width: 100%;
  padding: 10px 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  color: ${({ theme }) => theme.onBackground};

  :hover {
    background-color: ${({ theme }) => theme.surface};
  }
`;

export const ImageLink = styled(Link)`
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 0 0 0 10px;
`;

export const Info = styled(FlexCol)`
  margin: 0 0 0 10px;
  align-items: flex-start;
`;

export const ProfileLink = styled(StyledLink)`
  font-size: 13px;
  font-weight: 600;
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 300;
`;

export const ProfileItemButtons = styled(FlexRow)`
  margin-left: auto;
  margin-right: 10px;
`;

export const SendMessageContainer = styled(FlexCol)`
  display: flex;
  width: 100%;
  height: 350px;
`;

export const StyledMessageHeader = styled(FlexRow)`
  padding: 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  flex: 1;
  background-color: ${({ theme }) => theme.surface2};
  color: ${({ theme }) => theme.onSurface};
`;

export const StyledMessageHeaderText = styled(FlexRow)`
  font-size: 15px;
  font-weight: 600;
`;

export const StyledCancelButton = styled(IconButton)`
  margin-left: auto;
`;

export const SendMessageProfileContainer = styled(FlexRow)`
  padding: 10px;
  flex: 1;
  color: ${({ theme }) => theme.onSurface};
`;

export const SendMessageProfileInfo = styled(FlexRow)`
  width: 100%;
`;

export const SendMessageProfileUserName = styled(FlexRow)`
  margin-left: 10px;
  font-size: 13px;
`;

export const DialogLink = styled(StyledLink)`
  font-size: 13px;
  font-weight: 300;
  margin-left: auto;
`;

export const SendMessageFormCotainer = styled(FlexRow)`
  position: relative;
  padding: 10px;
  width: 100%;
  flex: 6;
`;

export const StyledSendMessageForm = styled(Form)`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  flex-flow: column nowrap;
`;

export const SendMessageTextArea = styled(StyledTextArea)`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const SendMessageError = styled.div`
  position: absolute;
  font-size: 12px;
  right: 0;
  top: -30px;
  padding: 5px;
  border-radius: var(--brsm);
  background-color: ${({ theme }) => theme.error};
  color: ${({ theme }) => theme.onError};
`;
