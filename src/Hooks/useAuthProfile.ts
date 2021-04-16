import { useContext } from "react";
import { AuthProfileContext } from "../Context";

const useAuthProfile = () => useContext(AuthProfileContext);

export default useAuthProfile;
