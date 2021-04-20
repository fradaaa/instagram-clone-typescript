import { BsCloudUpload } from "react-icons/bs";
import { ChoosePreviewContainer, PreviewText } from "./style";

type PreviewProps = {
  dragging: boolean;
};

const ChoosePreview = ({ dragging }: PreviewProps) => {
  return (
    <ChoosePreviewContainer>
      <BsCloudUpload />
      <PreviewText>
        {dragging ? (
          "Drop files here"
        ) : (
          <>
            No file chosen, yet!
            <br />
            You can select multiple files. (up to 5)
          </>
        )}
      </PreviewText>
    </ChoosePreviewContainer>
  );
};

export default ChoosePreview;
