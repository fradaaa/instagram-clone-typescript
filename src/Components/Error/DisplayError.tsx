import { ErrorContainer, ErrorText } from "./style";

const DisplayError = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ErrorContainer>
      <ErrorText>Something went wrong...</ErrorText>
      {children}
    </ErrorContainer>
  );
};

export default DisplayError;
