import React, { useEffect, useState } from "react";
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
  handleFiles: (files: File[]) => void;
};

const PhotoPreview = React.memo(
  ({
    images,
    active,
    isProcessing,
    removeFile,
    handleFiles,
    ...props
  }: PhotoPreviewProps) => {
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setDragging(true);
    };

    const handleDragExit = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
      setDragging(false);
    };

    const handleDragOver = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setDragging(false);
    };

    const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      setDragging(false);

      const items = e.dataTransfer.items;
      const files: File[] = [];

      if (items) {
        for (let item of Array.from(items)) {
          if (item.kind === "file" && item.type.includes("image")) {
            files.push(item.getAsFile()!);
          }
        }
      }

      if (files.length) {
        handleFiles(files);
      } else {
        return;
      }
    };

    useEffect(() => {
      document.addEventListener("dragenter", handleDragEnter);
      document.addEventListener("dragexit", handleDragExit);
      document.addEventListener("dragover", handleDragOver);
      document.addEventListener("drop", handleDrop);

      return () => {
        document.removeEventListener("dragenter", handleDragEnter);
        document.removeEventListener("dragexit", handleDragExit);
        document.removeEventListener("dragover", handleDragOver);
        document.removeEventListener("drop", handleDrop);
      };
    });

    return (
      <PhotoPreviewContainer
        active={active && !isProcessing}
        onDrop={handleDropFile}
      >
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
          <ChoosePreview dragging={dragging} />
        )}
      </PhotoPreviewContainer>
    );
  }
);

export default PhotoPreview;
