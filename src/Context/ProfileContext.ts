import { Document } from "@nandorojo/swr-firestore";
import { createContext } from "react";
import { IProfile } from "../Firebase/types";

const ProfileContext = createContext<Document<IProfile> | null>(null);
ProfileContext.displayName = "Profile";

export default ProfileContext;
