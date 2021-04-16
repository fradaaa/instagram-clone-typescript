import { Document } from "@nandorojo/swr-firestore";
import { Link } from "react-router-dom";
import { IProfile } from "../../Firebase/types";
import { RoundProfileImage, StyledLink } from "../Globals";
import {
  MessagesHeaderContainer,
  MessagesHeaderPhoto,
  MessagesHeaderUserName,
} from "./style";

const MessagesHeader = ({
  dialogProfile: { userName, photoURL },
}: {
  dialogProfile: Document<IProfile>;
}) => {
  return (
    <MessagesHeaderContainer>
      <MessagesHeaderUserName>
        <StyledLink to={`/${userName}`}>{userName}</StyledLink>
      </MessagesHeaderUserName>
      <MessagesHeaderPhoto>
        <Link to={`/${userName}`} aria-label={`${userName}'s profile`}>
          <RoundProfileImage
            width="40"
            height="40"
            src={photoURL}
            userName={userName}
          />
        </Link>
      </MessagesHeaderPhoto>
    </MessagesHeaderContainer>
  );
};

export default MessagesHeader;
