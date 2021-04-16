import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { LoginForm, ResetPasswordForm, SignUpForm } from "../Components/Forms";
import { useAuthUser } from "../Hooks";
import Edit from "./Edit";
import { AccountsContainer } from "./style";
import Upload from "./Upload";

const Accounts = () => {
  const match = useRouteMatch();
  const authUser = useAuthUser();

  return (
    <AccountsContainer>
      <Switch>
        <Route path={`${match.path}/login`}>
          {authUser ? <Redirect to="/" /> : <LoginForm />}
        </Route>
        <Route path={`${match.path}/signup`}>
          {authUser ? <Redirect to="/" /> : <SignUpForm />}
        </Route>
        <Route path={`${match.path}/resetpassword`}>
          <ResetPasswordForm />
        </Route>
        <Route path={`${match.path}/edit`}>
          {authUser ? <Edit /> : <Redirect to="/accounts/login" />}
        </Route>
        <Route path={`${match.path}/upload`}>
          {authUser ? <Upload /> : <Redirect to="/accounts/login" />}
        </Route>
      </Switch>
    </AccountsContainer>
  );
};

export default Accounts;
