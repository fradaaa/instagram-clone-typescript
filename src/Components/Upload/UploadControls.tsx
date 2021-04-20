import React, { useRef } from "react";
import { useHistory } from "react-router";
import { StyledButton, UploadControlsContainer } from "./style";

type ControlsType = {
  disabled: boolean;
  postURL: string | null;
  isUploading: boolean;
  overallProgres: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const UploadControls = React.memo(
  ({
    disabled,
    postURL,
    isUploading,
    overallProgres,
    handleChange,
    handleUpload,
  }: ControlsType) => {
    const history = useHistory();
    const input = useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      input.current?.click();
    };

    const handleGoToPost = (e: React.MouseEvent<HTMLButtonElement>) => {
      history.push(postURL!);
    };

    return (
      <UploadControlsContainer>
        <input
          id="photo(s)"
          name="photo(s)"
          type="file"
          accept="image/png, image/jpeg"
          hidden
          multiple
          ref={input}
          onChange={handleChange}
        />
        <StyledButton onClick={handleClick}>Choose File(s)</StyledButton>
        <StyledButton
          disabled={disabled}
          onClick={postURL ? handleGoToPost : handleUpload}
        >
          {isUploading
            ? `Uploading... ${overallProgres}`
            : postURL
            ? "Go To Post"
            : "Upload"}
        </StyledButton>
      </UploadControlsContainer>
    );
  }
);

export default UploadControls;
