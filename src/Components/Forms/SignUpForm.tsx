import { Form, Formik } from "formik";
import { useEffect, useReducer } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useFirebase } from "../../Hooks";
import { formReducer } from "../../Reducers";
import { formInitialState } from "../../Reducers/formReducer";
import { SubmitButton } from "../Buttons";
import { StyledLink } from "../Globals";
import {
  FormContainer,
  FormHeader,
  FormInfoContainer,
  FormSubheader,
  StyledFormError,
} from "./style";
import TextInput from "./TextInput";

interface Values {
  email: string;
  fullName: string;
  userName: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  fullName: "",
  userName: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email address"),
  fullName: Yup.string()
    .required("Required")
    .max(30, "Must be 30 characters or less")
    .trim("No leading and trailing whitespaces")
    .strict(),
  userName: Yup.string()
    .required("Required")
    .min(5, "Must be 5 characters or more")
    .max(20, "Must be 20 characters or less")
    .trim("No leading and trailing whitespaces")
    .strict(),
  password: Yup.string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Must be 20 characters or less")
    .trim("No leading and trailing whitespaces")
    .strict(),
});

const SignUpForm = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [state, dispatch] = useReducer(formReducer, formInitialState);
  const { isError, error } = state;

  useEffect(() => {
    document.title = "Sign Up";
  });

  return (
    <>
      <FormContainer>
        <FormHeader>Instagram</FormHeader>
        <FormSubheader>
          Sign up to see photos and videos from your friends
        </FormSubheader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values: Values) => {
            dispatch({ type: "reset" });
            try {
              await firebase.createUser(values);
              history.replace("/");
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
              errorInfo
            />
            <TextInput
              label="Fullname"
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Jane Doe"
              errorInfo
            />
            <TextInput
              label="UserName"
              type="text"
              id="userName"
              name="userName"
              placeholder="jane"
              errorInfo
            />
            <TextInput
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              errorInfo
            />
            <SubmitButton>Sign Up</SubmitButton>
            {isError && <StyledFormError>{error.message}</StyledFormError>}
          </Form>
        </Formik>
      </FormContainer>
      <FormInfoContainer>
        Have an account? <StyledLink to="/accounts/login">Log In</StyledLink>
      </FormInfoContainer>
    </>
  );
};

export default SignUpForm;
