import { useCollection } from "@nandorojo/swr-firestore";
import { IPost } from "../../Firebase/types";
import { useAuthUser, useProfile } from "../../Hooks";
import { DisplayError } from "../Error";
import ProfilePostPreview, { ProfilePostSaved } from "./ProfilePostPreview";
import { ProfilePostsContainer } from "./style";

type ProfilePostsProps = {
  type: "PROFILE" | "SAVED";
};

const ProfilePosts = ({ type }: ProfilePostsProps) => {
  const { id } = useProfile();
  const authUser = useAuthUser();
  const path =
    type === "PROFILE" ? "/posts" : `/savedPosts/${authUser?.uid}/refs`;
  const { data, error } = useCollection<IPost>(
    path,
    type === "PROFILE"
      ? {
          where: ["ownerId", "==", id],
          orderBy: ["timestamp", "desc"],
        }
      : {
          orderBy: ["timestamp", "desc"],
        }
  );

  if (error) return <DisplayError />;

  return data ? (
    <ProfilePostsContainer>
      {type === "PROFILE"
        ? data.map((post) => (
            <ProfilePostPreview modal key={post.id} {...post} />
          ))
        : data.map((post) => (
            <ProfilePostSaved key={post.id} postId={post.id} />
          ))}
    </ProfilePostsContainer>
  ) : null;
};

export default ProfilePosts;
