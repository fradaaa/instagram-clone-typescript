import { Form, Formik } from "formik";
import { useEffect, useReducer } from "react";
import * as Yup from "yup";
import { useFirebase } from "../../Hooks";
import { formReducer } from "../../Reducers";
import { formInitialState } from "../../Reducers/formReducer";
import { SubmitButton } from "../Buttons";
import ProfileImageHeader from "./ProfileImageHeader";
import { EditFormContainer, StyledFormError, SuccessText } from "./style";
import TextInput from "./TextInput";

type Values = {
  oldPassword: string;
  email: string;
};

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be 20 characters or less")
    .trim(),
  email: Yup.string().required("Required").email("Invalid email address"),
});

const ChangeEmailForm = () => {
  const firebase = useFirebase();
  const [state, dispatch] = useReducer(formReducer, formInitialState);
  const { error, isError, isSuccess } = state;

  useEffect(() => {
    document.title = "Change Email";
  });

  return (
    <EditFormContainer>
      <ProfileImageHeader />
      <Formik
        initialValues={{
          oldPassword: "",
          email: firebase.auth.currentUser?.email!,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          dispatch({ type: "reset" });
          const { oldPassword, email } = values;
          try {
            await firebase.changeEmail(oldPassword, email);
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
            label="New Email"
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.com"
          />
          <SubmitButton>Change Email</SubmitButton>
          {isSuccess && <SuccessText>Your email has been updated.</SuccessText>}
          {isError && <StyledFormError>{error.message}</StyledFormError>}
        </Form>
      </Formik>
    </EditFormContainer>
  );
};

export default ChangeEmailForm;
