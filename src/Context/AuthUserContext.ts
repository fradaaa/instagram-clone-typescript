import { createContext } from "react";

const AuthUserContext = createContext<firebase.default.User | null>(null);

export default AuthUserContext;
