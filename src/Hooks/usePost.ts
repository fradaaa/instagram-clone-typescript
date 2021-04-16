import { useContext } from "react";
import { PostContext } from "../Context";

const usePost = () => useContext(PostContext)!;

export default usePost;
