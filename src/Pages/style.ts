import styled from "@emotion/styled";
import { FlexCol, FlexRow } from "../Components/Globals";

export const AccountsContainer = styled(FlexCol)`
  justify-content: center;
  align-items: center;
  flex: 1;
  border-radius: var(--brmd);
  border: none;
  background-color: ${({ theme }) => theme.surface};
`;

export const DirectContainer = styled(FlexRow)`
  background-color: ${({ theme }) => theme.surface};
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  border-radius: var(--brmd);
  flex: 1;
  align-items: stretch;
  max-height: 720px;
  overflow: hidden;
`;

export const DirectMessagesContainer = styled(FlexRow)`
  flex: 3;
`;

export const EditContainer = styled(FlexRow)`
  align-items: stretch;
  width: 100%;
  height: 100%;
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  flex: 1;
  border-radius: var(--brmd);
  overflow: hidden;
`;

export const EditContentContainer = styled(FlexRow)`
  flex: 3;
  padding: 20px;
`;

export const FeedContainer = styled(FlexRow)`
  align-items: flex-start;
`;

export const TimeLineContainer = styled(FlexCol)`
  flex: 4;
`;

export const PostContainer = styled(FlexCol)`
  margin: 30px 0;
`;

export const UploadContainer = styled(FlexCol)`
  height: 450px;
  width: 450px;
  text-align: center;
`;
