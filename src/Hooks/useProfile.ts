import { useContext } from "react";
import { ProfileContext } from "../Context";

const usePost = () => useContext(ProfileContext)!;

export default usePost;
