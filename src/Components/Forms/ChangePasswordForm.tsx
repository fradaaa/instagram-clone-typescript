import { Form, Formik } from "formik";
import { useEffect, useReducer } from "react";
import * as Yup from "yup";
import { useFirebase } from "../../Hooks";
import { formReducer } from "../../Reducers";
import { formInitialState } from "../../Reducers/formReducer";
import { SubmitButton } from "../Buttons";
import ProfileImageHeader from "./ProfileImageHeader";
import {
  EditFormContainer,
  StyledFormError,
  StyledFormLink,
  SuccessText,
} from "./style";
import TextInput from "./TextInput";

type Values = {
  oldPassword: string;
  newPassword: string;
};

const initalValues: Values = {
  oldPassword: "",
  newPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be 20 characters or less")
    .trim(),
  newPassword: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be 20 characters or less")
    .trim(),
});

const ChangePasswordForm = () => {
  const firebase = useFirebase();
  const [state, dispatch] = useReducer(formReducer, formInitialState);
  const { error, isError, isSuccess } = state;

  useEffect(() => {
    document.title = "Change Password";
  });

  return (
    <EditFormContainer>
      <ProfileImageHeader />
      <Formik
        initialValues={initalValues}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          dispatch({ type: "reset" });
          const { oldPassword, newPassword } = values;
          try {
            await firebase.changePassword(oldPassword, newPassword);
            dispatch({ type: "success" });
          } catch (error) {
            dispatch({ type: "error", payload: error });
          }
        }}
      >
        <Form>
          <TextInput
            label="Old Password"
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder="********"
          />
          <TextInput
            label="New Password"
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder=""
          />
          <SubmitButton>Change Password</SubmitButton>
          <StyledFormLink to="/accounts/resetpassword">
            Forgot password?
          </StyledFormLink>
          {isSuccess && (
            <SuccessText>Your password has been updated.</SuccessText>
          )}
          {isError && <StyledFormError>{error.message}</StyledFormError>}
        </Form>
      </Formik>
    </EditFormContainer>
  );
};

export default ChangePasswordForm;
