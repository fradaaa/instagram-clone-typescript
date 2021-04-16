import { useRef } from "react";
import { useFirebase, useIsOwner, useProfile } from "../../Hooks";
import { RoundProfileImage } from "../Globals";
import { ProfilePhotoContainer } from "./style";

const ProfileHeaderPhoto = () => {
  const firebase = useFirebase();
  const { userName, photoURL, id } = useProfile();
  const isOwner = useIsOwner(id);
  const input = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    input.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      try {
        await firebase.updateAvatar(files[0], photoURL);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ProfilePhotoContainer>
      {isOwner ? (
        <>
          <RoundProfileImage
            width="150"
            height="150"
            src={photoURL}
            userName={userName}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
            alt="Add a profile photo"
          />
          <input
            ref={input}
            id="avatar"
            name="avatar"
            type="file"
            accept="image/png, image/jpeg"
            hidden
            onChange={handleChange}
          />
        </>
      ) : (
        <RoundProfileImage
          width="150"
          height="150"
          src={photoURL}
          userName={userName}
        />
      )}
    </ProfilePhotoContainer>
  );
};

export default ProfileHeaderPhoto;
