import { useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import LazyLoad from "react-lazyload";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFirebase, usePost } from "../../Hooks";
import { DisplayError } from "../Error";
import { LazyPreloader } from "../Globals";
import { PostPhotoContainer } from "./style";

const PostPhoto = () => {
  const { URLs, id } = usePost();
  const [disabled, setDisabled] = useState(false);
  const { removeLike, addLike, getAuthUserId } = useFirebase();
  const { data, error, revalidate } = useDocument(
    `postLikes/${id}/refs/${getAuthUserId()}`
  );

  if (error) return <DisplayError />;

  const handleDoubleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Node;
    if (disabled || target.nodeName !== "IMG") return;

    if (data?.exists) {
      setDisabled(true);
      await removeLike(id);
    } else {
      setDisabled(true);
      await addLike(id);
    }
    await revalidate();
    setDisabled(false);
  };

  return (
    <PostPhotoContainer onDoubleClick={handleDoubleClick}>
      {URLs.length > 1 ? (
        <Swiper
          slidesPerView="auto"
          observer
          observeParents
          navigation
          pagination
          preloadImages={false}
          lazy={{ checkInView: true }}
          watchSlidesProgress
          watchSlidesVisibility
        >
          {URLs.map((src, i) => (
            <SwiperSlide key={i}>
              <img key={i} data-src={src} alt="" className="swiper-lazy" />
              <LazyPreloader className="swiper-lazy-preloader" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <LazyLoad
          placeholder={<LazyPreloader />}
          offset={100}
          style={{ display: "flex" }}
          once
        >
          <img src={URLs[0]} alt="" />
        </LazyLoad>
      )}
    </PostPhotoContainer>
  );
};

export default PostPhoto;
