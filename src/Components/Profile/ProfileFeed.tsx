import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { useAuthUser, useProfile } from "../../Hooks";
import ProfileNav from "./ProfileNav";
import ProfilePosts from "./ProfilePosts";

const ProfileFeed = () => {
  const match = useRouteMatch();
  const { id, userName } = useProfile();
  const authUser = useAuthUser();

  return (
    <>
      <ProfileNav />
      <Switch>
        <Route exact path={`${match.path}`}>
          <ProfilePosts type="PROFILE" />
        </Route>
        <Route exact path={`${match.path}/saved`}>
          {!authUser ? (
            <Redirect to={`/${userName}`} />
          ) : authUser.uid === id ? (
            <ProfilePosts type="SAVED" />
          ) : (
            <Redirect to={`/${userName}`} />
          )}
        </Route>
      </Switch>
    </>
  );
};

export default ProfileFeed;
