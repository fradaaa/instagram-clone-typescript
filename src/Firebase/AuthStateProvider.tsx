import { IconLoader } from "../Components/Globals";
import { AuthProfileContext, AuthUserContext } from "../Context";
import { useAuthState } from "../Hooks";

const AuthStateProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser, authProfile, isLoading } = useAuthState();

  return isLoading ? (
    <IconLoader />
  ) : (
    <AuthUserContext.Provider value={authUser}>
      <AuthProfileContext.Provider value={authUser ? authProfile : null}>
        {children}
      </AuthProfileContext.Provider>
    </AuthUserContext.Provider>
  );
};

export default AuthStateProvider;
