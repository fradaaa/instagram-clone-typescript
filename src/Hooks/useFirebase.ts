import { useContext } from "react";
import { FirebaseContext } from "../Firebase/FirebaseProvider";

const useFirebase = () => useContext(FirebaseContext);

export default useFirebase;
