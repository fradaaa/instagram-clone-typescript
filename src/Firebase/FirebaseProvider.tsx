import { FuegoProvider } from "@nandorojo/swr-firestore";
import { createContext } from "react";
import AuthStateProvider from "./AuthStateProvider";
import Fuego from "./fuego";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const fuego = new Fuego(config);

const FirebaseContext = createContext(fuego);

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FirebaseContext.Provider value={fuego}>
      <FuegoProvider fuego={fuego}>
        <AuthStateProvider>{children}</AuthStateProvider>
      </FuegoProvider>
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext };

export default FirebaseProvider;
