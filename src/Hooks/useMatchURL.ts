import { useLocation } from "react-router";

const useMatchURL = (URL: string) => {
  const location = useLocation();
  return location.pathname === URL;
};

export default useMatchURL;
