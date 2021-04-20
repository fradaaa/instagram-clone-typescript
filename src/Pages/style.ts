import styled from "@emotion/styled";
import { FlexCol, FlexRow } from "../Components/Globals";
import { mq } from "../Theme";

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

type DirectProps = {
  hide: boolean;
};

export const DirectMessagesContainer = styled(FlexRow)<DirectProps>`
  display: ${({ hide }) => (hide ? "flex" : "none")};
  flex: 3;

  ${mq["sm"]} {
    display: flex;
  }
`;

export const EditContainer = styled(FlexCol)`
  align-items: stretch;
  width: 100%;
  height: 100%;
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  flex: 1;
  border-radius: var(--brmd);
  overflow: hidden;

  ${mq["sm"]} {
    flex-flow: row;
  }
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
  width: 350px;
  text-align: center;

  ${mq["md"]} {
    width: 450px;
  }
`;
