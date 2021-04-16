type State = {
  files: File[];
  images: string[];
  active: boolean;
  isProcessing: boolean;
  isUploading: boolean;
  progress: number;
  uploadedCount: number;
  postURL: string | null;
};

type Action =
  | { type: "processing" }
  | {
      type: "setFiles";
      payload: {
        images: string[];
        files: File[];
      };
    }
  | { type: "upload" }
  | { type: "updateProgress"; payload: number }
  | { type: "updateUploadedCount" }
  | { type: "setPostURL"; payload: string }
  | { type: "removeFile"; payload: number };

export const uploadIntialState: State = {
  files: [],
  images: [],
  active: false,
  isProcessing: false,
  isUploading: false,
  progress: 0,
  uploadedCount: 0,
  postURL: null,
};

const uploadReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "processing":
      return {
        ...state,
        isProcessing: true,
        postURL: null,
      };
    case "setFiles": {
      const { files, images } = action.payload;
      return {
        ...state,
        files,
        images,
        active: true,
        isProcessing: false,
        uploadedCount: 0,
      };
    }
    case "upload":
      return {
        ...state,
        isUploading: true,
      };
    case "updateProgress":
      return {
        ...state,
        progress: action.payload,
      };
    case "updateUploadedCount":
      return {
        ...state,
        uploadedCount: state.uploadedCount + 1,
      };
    case "setPostURL":
      return {
        ...state,
        isUploading: false,
        postURL: action.payload,
      };
    case "removeFile":
      return {
        ...state,
        files: state.files.filter((_, i) => i !== action.payload),
        images: state.images.filter((_, i) => i !== action.payload),
        active: state.files.length > 1 || false,
        postURL: state.files.length > 1 ? state.postURL : null,
      };
    default:
      return state;
  }
};

export default uploadReducer;
