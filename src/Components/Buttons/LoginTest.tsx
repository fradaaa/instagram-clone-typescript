import { useFormikContext } from "formik";
import { LoginValues } from "../Forms/LoginForm";
import { Button } from "./style";

const LoginTest = () => {
  const { setValues, submitForm } = useFormikContext<LoginValues>();

  const handleClick = () => {
    setValues({
      email: process.env.REACT_APP_LOGIN!,
      password: process.env.REACT_APP_PASSWORD!,
    });
    submitForm();
  };

  return <Button onClick={handleClick}>Login with test account</Button>;
};

export default LoginTest;
