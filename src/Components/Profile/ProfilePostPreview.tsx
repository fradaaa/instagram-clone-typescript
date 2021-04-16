import { Document, useDocument } from "@nandorojo/swr-firestore";
import React, { useState } from "react";
import { AiFillHeart, AiFillSwitcher } from "react-icons/ai";
import LazyLoad from "react-lazyload";
import { IPost } from "../../Firebase/types";
import { useModal } from "../../Hooks";
import { DisplayError } from "../Error";
import { LazyPreloader } from "../Globals";
import { Modal, PostModal } from "../Modals";
import {
  InfoNumber,
  MutltiplePhotosContainer,
  PostLink,
  PostPreviewContainer,
  PreviewinfoContainer,
  PreviewPhotoContainer,
} from "./style";

const PreviewInfo = ({ likesNumber }: { likesNumber: number }) => {
  return (
    <PreviewinfoContainer>
      <AiFillHeart />
      <InfoNumber>{likesNumber}</InfoNumber>
    </PreviewinfoContainer>
  );
};

const MutltiplePhotos = () => {
  return (
    <MutltiplePhotosContainer>
      <AiFillSwitcher />
    </MutltiplePhotosContainer>
  );
};

export const ProfilePostSaved = ({ postId }: { postId: string }) => {
  const { data, error } = useDocument<IPost>(`/posts/${postId}`);

  if (error) return <DisplayError />;

  return data ? <ProfilePostPreview modal {...data} /> : null;
};

interface PreviewProps extends Document<IPost> {
  revalidate?: () => Promise<boolean>;
  modal?: boolean;
}

const ProfilePostPreview = React.memo(
  ({ id, URLs, likesNumber, description, revalidate, modal }: PreviewProps) => {
    const [show, setShow] = useState(false);
    const { show: showModal, closeModal, openModal } = useModal();

    const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setShow(true);
    };

    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setShow(false);
    };

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (modal) {
        e.preventDefault();
        openModal();
        setShow(false);
      } else if (revalidate) {
        await revalidate();
      }
    };

    return (
      <PostPreviewContainer
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <PostLink to={`/p/${id}`} onClick={handleClick}>
          <PreviewPhotoContainer>
            <LazyLoad
              placeholder={<LazyPreloader />}
              offset={100}
              style={{ display: "flex" }}
              once
            >
              <img src={URLs[0]} alt={description} />
            </LazyLoad>
          </PreviewPhotoContainer>
          {show && <PreviewInfo likesNumber={likesNumber} />}
          {URLs.length > 1 && <MutltiplePhotos />}
        </PostLink>
        {showModal && (
          <Modal
            isOpen={showModal}
            contentLabel="Post Modal"
            onRequestClose={closeModal}
            post
          >
            <PostModal postId={id} />
          </Modal>
        )}
      </PostPreviewContainer>
    );
  }
);

export default ProfilePostPreview;
