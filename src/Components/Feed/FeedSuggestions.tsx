import { useCollection } from "@nandorojo/swr-firestore";
import { IProfile } from "../../Firebase/types";
import { useAuthUser } from "../../Hooks";
import { DisplayError } from "../Error";
import { RoundProfileImage } from "../Globals";
import { ImageLink, StyledItem } from "../Modals/style";
import {
  FeedSuggestionsContainer,
  FeedSuggestionsText,
  StyledProfileLink,
} from "./style";

const FeedSuggestions = () => {
  const authUser = useAuthUser();
  const { data, error } = useCollection<IProfile>("/users");

  if (error) return <DisplayError />;

  return (
    <FeedSuggestionsContainer>
      <FeedSuggestionsText>Suggestions For You</FeedSuggestionsText>
      {data
        ? data.map(({ userName, photoURL, id }) =>
            authUser?.uid !== id ? (
              <StyledItem key={id}>
                <ImageLink
                  to={`/${userName}`}
                  aria-label={`${userName}'s profile`}
                >
                  <RoundProfileImage
                    width="30"
                    height="30"
                    src={photoURL}
                    userName={userName}
                  />
                </ImageLink>
                <StyledProfileLink to={`/${userName}`}>
                  {userName}
                </StyledProfileLink>
              </StyledItem>
            ) : null
          )
        : null}
    </FeedSuggestionsContainer>
  );
};

export default FeedSuggestions;
