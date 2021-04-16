import { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Dialogs } from "../Components/Dialogs";
import { ChooseDialog, Messages } from "../Components/Messages";
import { DirectContainer, DirectMessagesContainer } from "./style";

const Direct = () => {
  const match = useRouteMatch();

  useEffect(() => {
    document.title = "Direct";
  });

  return (
    <DirectContainer>
      <Dialogs />
      <DirectMessagesContainer>
        <Switch>
          <Route path={`${match.path}`} exact>
            <ChooseDialog />
          </Route>
          <Route path={`${match.path}/:dialogId`}>
            <Messages />
          </Route>
        </Switch>
      </DirectMessagesContainer>
    </DirectContainer>
  );
};

export default Direct;
