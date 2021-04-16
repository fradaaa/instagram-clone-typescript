import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { EditNav } from "../Components/EditNav";
import {
  EditProfileForm,
  ChangePasswordForm,
  ChangeEmailForm,
} from "../Components/Forms";
import { EditContainer, EditContentContainer } from "./style";

const Edit = () => {
  const match = useRouteMatch();

  return (
    <EditContainer>
      <EditNav />
      <EditContentContainer>
        <Switch>
          <Route path={`${match.path}/profile`}>
            <EditProfileForm />
          </Route>
          <Route path={`${match.path}/password`}>
            <ChangePasswordForm />
          </Route>
          <Route path={`${match.path}/email`}>
            <ChangeEmailForm />
          </Route>
        </Switch>
      </EditContentContainer>
    </EditContainer>
  );
};

export default Edit;
