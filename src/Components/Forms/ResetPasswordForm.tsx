import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useReducer } from "react";
import * as Yup from "yup";
import { useFirebase } from "../../Hooks";
import { formReducer } from "../../Reducers";
import { formInitialState } from "../../Reducers/formReducer";
import { SubmitButton } from "../Buttons";
import {
  FormContainer,
  FormHeader,
  FormInfoContainer,
  FormSubheader,
  StyledFormError,
  StyledFormLink,
  SuccessText,
} from "./style";
import TextInput from "./TextInput";

interface Values {
  email: string;
}

const initialValues: Values = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email address"),
});

const ResetPasswordForm = () => {
  const firebase = useFirebase();
  const [state, dispatch] = useReducer(formReducer, formInitialState);
  const { error, isError, isSuccess } = state;

  useEffect(() => {
    document.title = "Reset Password";
  });

  return (
    <>
      <FormContainer>
        <FormHeader>Trouble logging in?</FormHeader>
        <FormSubheader>
          Enter your email and we'll send you a link to get back into your
          account.
        </FormSubheader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (
            values: Values,
            { resetForm }: FormikHelpers<Values>
          ) => {
            dispatch({ type: "reset" });
            try {
              await firebase.auth.sendPasswordResetEmail(values.email);
              resetForm();
              dispatch({ type: "success" });
            } catch (error) {
              dispatch({ type: "error", payload: error });
            }
          }}
        >
          <Form>
            <TextInput
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
            />
            <SubmitButton>Send Login Link</SubmitButton>
            {isSuccess && (
              <SuccessText>
                Thanks! Please check your email address for a link to reset your
                password.
              </SuccessText>
            )}
            {isError && <StyledFormError>{error.message}</StyledFormError>}
          </Form>
        </Formik>
      </FormContainer>
      <FormInfoContainer>
        <StyledFormLink to="/accounts/login">Back to login</StyledFormLink>
      </FormInfoContainer>
    </>
  );
};

export default ResetPasswordForm;
