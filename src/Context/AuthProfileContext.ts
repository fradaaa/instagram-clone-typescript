import { Document } from "@nandorojo/swr-firestore";
import { createContext } from "react";
import { IProfile } from "../Firebase/types";

interface AuthProfile extends Document<IProfile> {
  update: (data: Partial<IProfile>) => Promise<void> | null;
  revalidate?: () => Promise<boolean>;
}

const AuthProfileContext = createContext<AuthProfile | null>(null);

export default AuthProfileContext;
