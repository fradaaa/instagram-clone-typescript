import styled from "@emotion/styled";
import { Form } from "formik";
import { mq } from "../../Theme";
import { IconButton } from "../Buttons/style";
import { FlexCol, FlexRow, StyledLink, StyledTextArea } from "../Globals";

export const ChooseDialogContainer = styled(FlexCol)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.onSurface};

  & svg {
    display: flex;
    width: 100px;
    height: 100px;
  }
`;

export const ChooseDialogMainText = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

export const ChooseDialogSubText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.primary};
`;

export const MessagesContainer = styled(FlexCol)`
  justify-content: stretch;
  width: 100%;
  height: 100%;
`;

export const MessagesHeaderContainer = styled(FlexRow)`
  max-height: 60px;
  justify-content: center;
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  background-color: ${({ theme }) => theme.surface2};
  padding: 10px;
  flex: 1;
`;

export const MessagesGoBack = styled(StyledLink)`
  padding: 5px;
  display: flex;

  & svg {
    display: block;
    width: 20px;
    height: 20px;
  }

  ${mq["sm"]} {
    display: none;
  }
`;

export const MessagesHeaderUserName = styled.div`
  font-weight: 600;
  font-size: 15px;
`;

export const MessagesHeaderPhoto = styled(FlexRow)`
  justify-content: center;
  margin-left: auto;
`;

export const MessagesListContainer = styled(FlexCol)`
  flex: 16;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  padding: 5px;
  position: relative;
`;

export const MessagesControlsContainer = styled(FlexRow)`
  width: 100%;
  position: sticky;
  top: 0;
  justify-content: flex-end;
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.surface2};
  border-radius: var(--brmd);
`;

export const MessageControlButton = styled(IconButton)`
  padding: 5px;
`;

type StyledMessageProps = {
  selected?: boolean;
  sent?: boolean;
};

export const MessageWrapper = styled(FlexRow)<StyledMessageProps>`
  justify-content: ${({ sent }) => (sent ? "flex-start" : "flex-end")};
  align-items: center;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledMessage = styled(FlexRow)<StyledMessageProps>`
  justify-content: ${({ sent }) => (sent ? "flex-start" : "flex-end")};
  flex-direction: ${({ sent }) => (sent ? "row" : "row-reverse")};
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: var(--brlg);
  transition: color 0.1s ease-in, background-color 0.1s ease-in;
  color: ${({ selected, theme }) =>
    selected ? theme.onPrimary : theme.onSurface};
  background-color: ${({ selected, theme }) =>
    selected ? theme.primary : theme.surface2};

  &:hover {
    cursor: pointer;
    background-color: ${({ selected, theme }) =>
      selected ? theme.primary : theme.surface3};
  }

  ${mq["md"]} {
    width: 50%;
  }
`;

export const MessagePhoto = styled(FlexRow)`
  justify-content: center;
`;

export const MessageContent = styled(FlexCol)<StyledMessageProps>`
  width: 100%;
  justify-content: flex-end;
  margin-left: ${({ sent }) => sent && "10px"};
  margin-right: ${({ sent }) => !sent && "10px"};
  align-items: ${({ sent }) => (sent ? "flex-start" : "flex-end")};
`;

export const MessageUserName = styled.div<StyledMessageProps>`
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, selected }) =>
    selected ? theme.onPrimary : theme.primary};
`;

export const MessageDate = styled(FlexRow)<StyledMessageProps>`
  justify-content: center;
  margin-left: 10px;
  font-size: 11px;
  color: ${({ selected, theme }) =>
    selected ? theme.onPrimary : theme.onSurface};
  font-weight: 600;
  white-space: nowrap;
`;

export const MessageText = styled(FlexRow)`
  margin-top: 5px;
  font-size: 13px;
  word-break: break-all;
`;

export const MessagesFormContainer = styled(FlexRow)`
  justify-content: center;
  border-top: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  padding: 10px;
  background-color: ${({ theme }) => theme.surface};
`;

export const StyledMessagesForm = styled(Form)`
  flex: 1;
  display: flex;
  align-items: center;

  & button {
    margin-left: 10px;
  }
`;

export const MessagesTextArea = styled(StyledTextArea)`
  flex: 3;
`;
