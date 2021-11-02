import { Form, Formik } from "formik";
import { useEffect, useReducer } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useFirebase, useQueryParams } from "../../Hooks";
import { formReducer } from "../../Reducers";
import { formInitialState } from "../../Reducers/formReducer";
import { SubmitButton } from "../Buttons";
import LoginTest from "../Buttons/LoginTest";
import {
  FormContainer,
  FormHeader,
  FormInfoContainer,
  StyledFormError,
  StyledFormLink,
} from "./style";
import TextInput from "./TextInput";

export interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email address"),
  password: Yup.string()
    .required("Required")
    .max(20, "Must be 20 characters or less")
    .trim("No leading and trailing whitespaces")
    .strict(),
});

const LoginForm = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const next = useQueryParams("next");
  const [state, dispatch] = useReducer(formReducer, formInitialState);
  const { isError, error } = state;

  useEffect(() => {
    document.title = "Login";
  });

  return (
    <>
      <FormContainer>
        <FormHeader>Instagram Clone</FormHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values: LoginValues) => {
            dispatch({ type: "reset" });
            const { email, password } = values;
            try {
              await firebase.auth.signInWithEmailAndPassword(email, password);
              history.replace(next || "/");
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
            <TextInput
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
            <SubmitButton>Login</SubmitButton>
            {isError && <StyledFormError>{error.message}</StyledFormError>}
            <StyledFormLink to="/accounts/resetpassword">
              Forgot password?
            </StyledFormLink>
            <LoginTest />
          </Form>
        </Formik>
      </FormContainer>
      <FormInfoContainer>
        Don't have an account?{" "}
        <StyledFormLink to="/accounts/signup">Sign Up</StyledFormLink>
      </FormInfoContainer>
    </>
  );
};

export default LoginForm;
