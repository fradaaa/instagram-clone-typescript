import styled from "@emotion/styled";
import { Form } from "formik";
import { mq } from "../../Theme";
import { FlexCol, FlexRow, StyledLink, StyledTextArea } from "../Globals";

type PostProps = {
  ratio: number;
  column?: boolean;
  margin?: number;
  modal?: boolean;
};

export const StyledPostContainer = styled(FlexRow)<PostProps>`
  position: relative;
  width: 100%;
  flex: 1;
  border: ${({ theme, modal }) =>
    modal ? "none" : `1px solid ${theme.lightBorder}`};
  border-radius: var(--brmd);
  overflow: hidden;
  padding-bottom: ${({ ratio }) => ratio * 1.3 + "%"};
  align-items: stretch;
  margin-bottom: ${({ margin }) => margin && margin + "px"};

  ${mq["md"]} {
    padding-bottom: ${({ ratio }) => ratio + "%"};
  }
`;

type WrapperProps = {
  column?: boolean;
};

export const PostWrapper = styled(FlexRow)<WrapperProps>`
  flex-direction: column;
  position: absolute;
  height: 100%;
  inset: 0;
  align-items: stretch;

  ${mq["md"]} {
    flex-direction: ${({ column }) => (column ? "column" : "row")};
  }
`;

export const PostPhotoContainer = styled(FlexRow)`
  /* background-color: ${({ theme }) => theme.surface2}; */
  flex: 10;
  align-items: stretch;

  & img {
    object-fit: cover;
  }
`;

export const PostInfoContainer = styled(FlexCol)`
  border-left: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  flex: 4;
  display: none;

  ${mq["md"]} {
    display: flex;
  }
`;

export const PostFeedInfoContainer = styled(FlexCol)`
  position: relative;
  width: 100%;
  padding: 10px;
  flex: 2;
  background-color: ${({ theme }) => theme.surface};
`;

export const CommentsLinkContainer = styled(FlexRow)`
  justify-content: center;
  max-height: 30px;
`;

export const CommentsLink = styled(StyledLink)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  padding: 5px;
  border-radius: var(--brsm);
  transition: background-color 0.1s ease-in, color 0.1s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.surface2};
  }
`;

export const PostHeaderContainer = styled(FlexRow)`
  position: relative;
  width: 100%;
  border-bottom: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  padding: 10px;
  background-color: ${({ theme }) => theme.surface2};
  color: ${({ theme }) => theme.onSurface};
  flex: 1;
  max-height: 70px;
`;

export const HiddenPostHeaderContainer = styled(PostHeaderContainer)`
  display: flex;

  ${mq["md"]} {
    display: none;
  }
`;

export const PostHeaderUserName = styled(FlexRow)`
  margin: 0 0 0 10px;
`;

export const PostProfileLink = styled(StyledLink)`
  font-size: 12px;
  font-weight: 600;
  margin: 0 5px 0 0;
`;

export const PostHeaderMenuContainer = styled(FlexRow)`
  position: absolute;
  right: 10px;
`;

export const PostCommentsContainer = styled(FlexCol)`
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 5px 10px;
  color: ${({ theme }) => theme.onSurface};
  flex: 10;
`;

export const StyledComments = styled(FlexCol)`
  color: ${({ theme }) => theme.onSurface};
`;

export const StyledComment = styled(FlexRow)`
  align-items: flex-start;
  width: 100%;
  margin: 10px 0;
`;

export const CommentData = styled.div`
  margin: 0 0 0 10px;
  line-height: 1.1;
`;

export const CommentText = styled.span`
  font-size: 13px;
  font-weight: 300;
`;

export const PostInteractionContainer = styled(FlexCol)`
  flex: 4;
  border-top: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  background-color: ${({ theme }) => theme.surface2};
  padding: 0 10px;

  ${mq["sm"]} {
    display: block;
  }
`;

export const PostButtonsContainer = styled(FlexRow)`
  flex: 1;
  padding: 5px 0;

  & button:last-of-type {
    margin-left: auto;
  }
`;

export const PostStatsContainer = styled(FlexRow)`
  flex: 1;
  padding: 5px 0;
  color: ${({ theme }) => theme.onSurface};
`;

export const PostStatsItem = styled(FlexRow)`
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  border-radius: var(--brsm);
  color: ${({ theme }) => theme.onSurface};
  transition: color 0.1s ease-in, background-color 0.1s ease-in;

  &:last-of-type {
    margin-left: auto;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.surface3};
  }
`;

export const PostFormContainer = styled(FlexRow)`
  flex: 2;
  border-top: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  padding: 10px 0;

  & button {
    flex: 1;
    margin-left: 5px;
  }
`;

export const StyledPostForm = styled(Form)`
  display: flex;
  align-items: center;
`;

export const PostTextArea = styled(StyledTextArea)`
  width: 100%;
  min-height: 50px;
  flex: 9;
`;

export const PostLoginText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.onSurface};
`;

export const PostLoginLink = styled(StyledLink)`
  &:link {
    color: ${({ theme }) => theme.primary};
  }
`;

export const PostSuggestionsContainer = styled(FlexCol)`
  margin-top: 100px;
  background-color: ${({ theme }) => theme.surface};
  border: ${({ theme }) => `1px solid ${theme.lightBorder}`};
  border-radius: var(--brmd);
  padding-bottom: 25px;
`;

export const SuggestionsText = styled(FlexRow)`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.onSurface};
  justify-content: center;
  padding: 10px;
  font-size: 16px;
  border-radius: var(--brmd) var(--brmd) 0 0;
`;

export const PostBottomInfoContainer = styled(FlexCol)`
  flex: 2;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.surface};

  ${mq["md"]} {
    display: none;
  }
`;
