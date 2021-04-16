import { useCallback, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import {
  PhotoPreview,
  UploadControls,
  UploadProgress,
} from "../Components/Upload";
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
    progress,
    uploadedCount,
  } = state;
  const overallProgres = `(${uploadedCount} / ${files.length})`;

  useEffect(() => {
    document.title = "Upload Photo";
  });

  const updateProgress = useCallback((percetange: number) => {
    dispatch({ type: "updateProgress", payload: percetange });
  }, []);

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
        const postURL = await firebase.uploadPhotos(
          files,
          updateProgress,
          updateUploadedCount
        );
        toast("Photo(s) has been uploaded.");
        dispatch({ type: "setPostURL", payload: postURL });
      } catch (error) {
        console.error(error);
      }
    },
    [files, firebase, updateProgress, updateUploadedCount]
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
      {isUploading && <UploadProgress percentage={progress} />}
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
