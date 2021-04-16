import { useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import { useFirebase } from ".";
import { IProfile } from "../Firebase/types";

const useAuthState = () => {
  const firebase = useFirebase();
  const [isLoading, setIsLoading] = useState(true);
  const [authUser, setAuthUser] = useState<firebase.default.User | null>(null);
  const { data, update } = useDocument<IProfile>(
    authUser ? `/users/${authUser.uid}` : null,
    { listen: false }
  );

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(async (authUser) => {
      setIsLoading(true);
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [firebase]);

  return {
    authUser,
    authProfile: data && data.exists ? { ...data, update } : null,
    isLoading,
  };
};

export default useAuthState;
