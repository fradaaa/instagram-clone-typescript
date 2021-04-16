type State = {
  error: any | null;
  isError: boolean;
  isSuccess: boolean;
};

type Action =
  | { type: "success" }
  | { type: "error"; payload: any }
  | { type: "reset" };

export const formInitialState: State = {
  error: null,
  isError: false,
  isSuccess: false,
};

const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "reset":
      return formInitialState;
    case "success":
      return {
        ...state,
        isSuccess: true,
      };
    case "error":
      return {
        error: action.payload,
        isError: true,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default formReducer;
