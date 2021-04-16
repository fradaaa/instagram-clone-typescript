import { useEffect } from "react";
import { StyledLink } from ".";
import { NoDocumentContainer } from "./style";

type Props = {
  type: "Post" | "Profile";
};

const NoDocument = ({ type }: Props) => {
  useEffect(() => {
    document.title = `${type} Not Found • Instagram Clone`;
  });

  return (
    <NoDocumentContainer>
      <h2>{`Sorry, this ${type.toLowerCase()} doesn't exist.`}</h2>
      <br />
      <div>
        The link you followed may be broken.{" "}
        <StyledLink to="/">Go back to Instagram Clone</StyledLink>
      </div>
    </NoDocumentContainer>
  );
};

export default NoDocument;
