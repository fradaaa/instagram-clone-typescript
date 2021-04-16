import { useContext } from "react";
import { AuthUserContext } from "../Context";

const useAuthUser = () => useContext(AuthUserContext);

export default useAuthUser;
