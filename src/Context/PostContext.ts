import { Document } from "@nandorojo/swr-firestore";
import { createContext } from "react";
import { IPost } from "../Firebase/types";

const PostContext = createContext<Document<IPost> | null>(null);
PostContext.displayName = "Post";

export default PostContext;
