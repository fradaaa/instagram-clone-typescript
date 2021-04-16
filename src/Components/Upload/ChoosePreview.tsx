import { BsCloudUpload } from "react-icons/bs";
import { ChoosePreviewContainer, PreviewText } from "./style";

const ChoosePreview = () => {
  return (
    <ChoosePreviewContainer>
      <BsCloudUpload />
      <PreviewText>
        No file chosen, yet!
        <br />
        You can select multiple files. (up to 5)
      </PreviewText>
    </ChoosePreviewContainer>
  );
};

export default ChoosePreview;
