import { useDocument } from "@nandorojo/swr-firestore";
import React from "react";
import { PostContext } from "../../Context";
import { IPost } from "../../Firebase/types";
import { DisplayError } from "../Error";
import PostFeedInfo from "./PostFeedInfo";
import PostHeader from "./PostHeader";
import PostInfo from "./PostInfo";
import PostPhoto from "./PostPhoto";
import PostSuggestions from "./PostSuggestions";
import { PostWrapper, StyledPostContainer } from "./style";

const RegularPost = ({ modal }: { modal?: boolean }) => {
  return (
    <StyledPostContainer ratio={70} modal={modal}>
      <PostWrapper>
        <PostPhoto />
        <PostInfo />
      </PostWrapper>
    </StyledPostContainer>
  );
};

const FeedPost = React.memo(({ postId }: { postId: string }) => {
  const { data, error } = useDocument<IPost>(`/posts/${postId}`, {
    listen: true,
  });

  if (error) return <DisplayError />;

  return data && data.exists ? (
    <PostContext.Provider value={data}>
      <StyledPostContainer ratio={100} column margin={50}>
        <PostWrapper column>
          <PostHeader />
          <PostPhoto />
          <PostFeedInfo />
        </PostWrapper>
      </StyledPostContainer>
    </PostContext.Provider>
  ) : null;
});

export { RegularPost, FeedPost, PostSuggestions };
