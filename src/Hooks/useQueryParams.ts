const { useLocation } = require("react-router-dom");

const useQueryParams = (queryString: string) => {
  const location = useLocation();
  return new URLSearchParams(location.search).get(queryString);
};

export default useQueryParams;
