import { useCollection } from "@nandorojo/swr-firestore";
import { IPost } from "../../Firebase/types";
import { usePost } from "../../Hooks";
import { DisplayError } from "../Error";
import { RingLoader } from "../Globals";
import ProfilePostPreview from "../Profile/ProfilePostPreview";
import { ProfilePostsContainer } from "../Profile/style";
import { PostSuggestionsContainer, SuggestionsText } from "./style";

const PostSuggestions = () => {
  const { ownerId, id } = usePost();
  const {
    data,
    error,
    loading,
    isValidating,
    revalidate,
  } = useCollection<IPost>("posts", {
    listen: true,
    limit: 6,
    where: ["ownerId", "==", ownerId],
  });

  if (error) return <DisplayError />;

  if (loading && isValidating) return <RingLoader />;

  return data && data.length > 1 ? (
    <PostSuggestionsContainer>
      <SuggestionsText>More posts</SuggestionsText>
      <ProfilePostsContainer>
        {data.map((post) =>
          post.id !== id ? (
            <ProfilePostPreview
              revalidate={revalidate}
              key={post.id}
              {...post}
            />
          ) : null
        )}
      </ProfilePostsContainer>
    </PostSuggestionsContainer>
  ) : null;
};

export default PostSuggestions;
