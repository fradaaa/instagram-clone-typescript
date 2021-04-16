import React from "react";
import { MdClear } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { RingLoader } from "../Globals";
import ChoosePreview from "./ChoosePreview";
import {
  CancelIconButton,
  PhotoPreviewContainer,
  PreviewImageContainer,
} from "./style";

type PhotoPreviewProps = {
  images: string[];
  active: boolean;
  isProcessing: boolean;
  removeFile: (index: number) => void;
};

const PhotoPreview = React.memo(
  ({ images, active, isProcessing, removeFile }: PhotoPreviewProps) => {
    return (
      <PhotoPreviewContainer active={active && !isProcessing}>
        {isProcessing ? (
          <RingLoader />
        ) : active ? (
          <Swiper
            slidesPerView="auto"
            observer
            observeParents
            navigation
            pagination
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <PreviewImageContainer>
                  <img src={src} alt="" />
                  <CancelIconButton
                    width="40"
                    height="40"
                    aria-label="Remove photo"
                    onClick={() => removeFile(i)}
                  >
                    <MdClear />
                  </CancelIconButton>
                </PreviewImageContainer>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ChoosePreview />
        )}
      </PhotoPreviewContainer>
    );
  }
);

export default PhotoPreview;
