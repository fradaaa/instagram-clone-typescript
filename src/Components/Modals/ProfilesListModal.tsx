import { useCollection } from "@nandorojo/swr-firestore";
import { DisplayError } from "../Error";
import ProfileItem from "./ProfileItem";
import {
  ProfilesListContainer,
  ProfilesListContent,
  ProfilesListHeader,
  ProfilesListHeaderText,
} from "./style";

type ProfilesListModalProps = {
  id: string;
  type: "postLikes" | "followers" | "following";
  closeModal: () => void;
};

const ProfilesListModal = ({
  id,
  type,
  closeModal,
}: ProfilesListModalProps) => {
  const { data, error } = useCollection(id ? `/${type}/${id}/refs` : null);

  if (error) return <DisplayError />;

  return (
    <ProfilesListContainer>
      <ProfilesListHeader>
        <ProfilesListHeaderText>
          {type === "postLikes" ? "likes" : type}
        </ProfilesListHeaderText>
      </ProfilesListHeader>
      <ProfilesListContent>
        {data
          ? data.map(({ id }) => (
              <ProfileItem key={id} id={id} closeModal={closeModal} />
            ))
          : null}
      </ProfilesListContent>
    </ProfilesListContainer>
  );
};

export default ProfilesListModal;
