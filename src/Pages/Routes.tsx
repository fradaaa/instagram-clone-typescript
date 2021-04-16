import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ErrorBoundary } from "../Components/Error";
import { RingLoader } from "../Components/Globals";
import { useAuthUser } from "../Hooks";
const Accounts = lazy(() => import("./Accounts"));
const Direct = lazy(() => import("./Direct"));
const Feed = lazy(() => import("./Feed"));
const Post = lazy(() => import("./Post"));
const Profile = lazy(() => import("./Profile"));

const Routes = () => {
  const authUser = useAuthUser();

  return (
    <ErrorBoundary>
      <Suspense fallback={<RingLoader />}>
        <Switch>
          <Route exact path="/">
            {authUser ? <Feed /> : <Redirect to="/accounts/login" />}
          </Route>
          <Route path="/accounts">
            <Accounts />
          </Route>
          <Route path="/direct">
            {authUser ? <Direct /> : <Redirect to="/accounts/login" />}
          </Route>
          <Route path="/p/:postId">
            <Post />
          </Route>
          <Route path="/:userName">
            <Profile />
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
