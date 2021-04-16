import { useCallback, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { PhotoPreview, UploadControls } from "../Components/Upload";
import { useFirebase } from "../Hooks";
import { uploadReducer } from "../Reducers";
import { uploadIntialState } from "../Reducers/uploadReducer";
import { UploadContainer } from "./style";

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      resolve(reader.result as string);
    });

    reader.readAsDataURL(file);
  });
};

const Upload = () => {
  const firebase = useFirebase();
  const [state, dispatch] = useReducer(uploadReducer, uploadIntialState);
  const {
    active,
    files,
    images,
    isProcessing,
    postURL,
    isUploading,
    uploadedCount,
  } = state;
  const overallProgres = `(${uploadedCount} / ${files.length})`;

  useEffect(() => {
    document.title = "Upload Photo";
  });

  const updateUploadedCount = useCallback(() => {
    dispatch({ type: "updateUploadedCount" });
  }, []);

  const removeFile = useCallback((index: number) => {
    dispatch({ type: "removeFile", payload: index });
  }, []);

  const uploadFiles = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch({ type: "upload" });
      try {
        const postURL = await firebase.uploadPhotos(files, updateUploadedCount);
        toast("Photo(s) has been uploaded.");
        dispatch({ type: "setPostURL", payload: postURL });
      } catch (error) {
        console.error(error);
      }
    },
    [files, firebase, updateUploadedCount]
  );

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files) {
        if (files.length > 5) return;

        const filesArray = Array.from(files);

        dispatch({ type: "processing" });
        const DataURLs = await Promise.all(filesArray.map((f) => readFile(f)));
        dispatch({
          type: "setFiles",
          payload: { files: filesArray, images: DataURLs },
        });
      }
    },
    []
  );

  return (
    <UploadContainer>
      <PhotoPreview
        images={images}
        active={active}
        isProcessing={isProcessing}
        removeFile={removeFile}
      />
      <UploadControls
        disabled={!active || isUploading}
        handleChange={handleChange}
        handleUpload={uploadFiles}
        postURL={postURL}
        isUploading={isUploading}
        overallProgres={overallProgres}
      />
    </UploadContainer>
  );
};

export default Upload;
