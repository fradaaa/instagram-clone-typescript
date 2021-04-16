import { Document, useDocument } from "@nandorojo/swr-firestore";
import React from "react";
import { Link } from "react-router-dom";
import { IComment, IProfile } from "../../Firebase/types";
import { DisplayError } from "../Error";
import { RoundProfileImage } from "../Globals";
import {
  CommentData,
  CommentText,
  PostCommentsContainer,
  PostProfileLink,
  StyledComment,
  StyledComments,
} from "./style";

const CommentItem = React.memo(({ authorId, comment }: IComment) => {
  const { data, error } = useDocument<IProfile>(`/users/${authorId}`);

  if (error) return <DisplayError />;

  return data ? (
    <StyledComment>
      <Link to={`/${data.userName}`} aria-label={`${data.userName}'s profile`}>
        <RoundProfileImage
          width="30"
          height="30"
          src={data.photoURL}
          userName={data.userName}
        />
      </Link>
      <CommentData>
        <PostProfileLink to={`/${data.userName}`}>
          {data.userName}
        </PostProfileLink>
        <CommentText>{comment}</CommentText>
      </CommentData>
    </StyledComment>
  ) : null;
});

const PostComments = ({ data }: { data: Document<IComment>[] }) => {
  return (
    <PostCommentsContainer>
      <StyledComments>
        {data.map((c) => (
          <CommentItem key={c.id} {...c} />
        ))}
      </StyledComments>
    </PostCommentsContainer>
  );
};

export default PostComments;
