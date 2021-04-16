import { useDocument } from "@nandorojo/swr-firestore";
import React from "react";
import { IProfile } from "../../Firebase/types";
import { useIsOwner } from "../../Hooks";
import { FollowButton } from "../Buttons";
import { DisplayError } from "../Error";
import { RoundProfileImage } from "../Globals";
import {
  ImageLink,
  Info,
  ProfileItemButtons,
  ProfileLink,
  StyledItem,
  UserName,
} from "./style";

type ProfileItemProps = {
  id: string;
  closeModal: () => void;
};

const ProfileItem = React.memo(({ id, closeModal }: ProfileItemProps) => {
  const { data, error } = useDocument<IProfile>(`users/${id}`);
  const isOwner = useIsOwner(id);

  if (error) return <DisplayError />;

  return data ? (
    <StyledItem>
      <ImageLink
        onClick={closeModal}
        to={`/${data.userName}`}
        aria-label={`${data.userName}'s profile`}
      >
        <RoundProfileImage
          width="30"
          height="30"
          src={data.photoURL}
          userName={data.userName}
        />
      </ImageLink>
      <Info>
        <ProfileLink onClick={closeModal} to={`/${data.userName}`}>
          {data.userName}
        </ProfileLink>
        <UserName>{data.fullName}</UserName>
      </Info>
      {!isOwner && (
        <ProfileItemButtons>
          <FollowButton profileId={id} />
        </ProfileItemButtons>
      )}
    </StyledItem>
  ) : null;
});

export default ProfileItem;
