import { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Dialogs } from "../Components/Dialogs";
import { ChooseDialog, Messages } from "../Components/Messages";
import { useMatchURL } from "../Hooks";
import { DirectContainer, DirectMessagesContainer } from "./style";

const Direct = () => {
  const match = useRouteMatch();
  const hide = !useMatchURL("/direct");

  useEffect(() => {
    document.title = "Direct";
  });

  return (
    <DirectContainer>
      <Dialogs />
      <DirectMessagesContainer hide={hide}>
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
