import { Form, Formik } from "formik";
import { useEffect, useReducer } from "react";
import * as Yup from "yup";
import { useAuthProfile } from "../../Hooks";
import { formReducer } from "../../Reducers";
import { formInitialState } from "../../Reducers/formReducer";
import { SubmitButton } from "../Buttons";
import ProfileImageHeader from "./ProfileImageHeader";
import { EditFormContainer, StyledFormError, SuccessText } from "./style";
import TextInput from "./TextInput";

type Values = {
  fullName: string;
  userName: string;
  userInformation: string;
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Required")
    .max(30, "Must be 30 characters or less"),
  userName: Yup.string()
    .required("Required")
    .min(5, "Must be 5 characters or more")
    .max(20, "Must be 20 characters or less")
    .trim("No leading and trailing whitespaces"),
  userInformation: Yup.string().max(50, "Must be 50 characters or less").trim(),
});

const EditProfileForm = () => {
  const { fullName, userName, userInformation, update } = useAuthProfile()!;
  const [state, dispatch] = useReducer(formReducer, formInitialState);
  const { error, isError, isSuccess } = state;

  useEffect(() => {
    document.title = "Edit Profile";
  });

  return (
    <EditFormContainer>
      <ProfileImageHeader />
      <Formik
        initialValues={{
          fullName,
          userName,
          userInformation,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          dispatch({ type: "reset" });
          try {
            await update(values);
            dispatch({ type: "success" });
          } catch (error) {
            dispatch({ type: "error", payload: error });
          }
        }}
      >
        <Form>
          <TextInput
            label="Full Name"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
          />
          <TextInput
            label="Username"
            id="userName"
            name="userName"
            type="text"
            placeholder="Username"
          />
          <TextInput
            label="User Information"
            id="userInformation"
            name="userInformation"
            type="text"
            placeholder="About..."
          />
          <SubmitButton>Update Profile</SubmitButton>
          {isSuccess && (
            <SuccessText>
              Your profile information has been updated.
            </SuccessText>
          )}
          {isError && <StyledFormError>{error.message}</StyledFormError>}
        </Form>
      </Formik>
    </EditFormContainer>
  );
};

export default EditProfileForm;
