import useFirebase from "./useFirebase";

const useIsOwner = (profileId: string) => {
  const firebase = useFirebase();
  return firebase.isOwner(profileId);
};

export default useIsOwner;
