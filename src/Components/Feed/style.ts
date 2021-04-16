import styled from "@emotion/styled";
import { mq } from "../../Theme";
import { FlexCol, FlexRow } from "../Globals";
import { ProfileLink } from "../Modals/style";

export const FeedSuggestionsContainer = styled(FlexCol)`
  position: sticky;
  top: 60px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: var(--brmd);
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  overflow: hidden;
  margin-left: 10px;
  flex: 1;
  display: none;

  ${mq["lg"]} {
    display: block;
  }
`;

export const FeedSuggestionsText = styled(FlexRow)`
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.onSurface};
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
`;

export const StyledProfileLink = styled(ProfileLink)`
  margin-left: 10px;
`;
