import { Document } from "@nandorojo/swr-firestore";
import React, { useState } from "react";
import { IMessage, IProfile } from "../../Firebase/types";
import { FlexRow, RoundProfileImage } from "../Globals";
import {
  MessageContent,
  MessageDate,
  MessagePhoto,
  MessageText,
  MessageUserName,
  MessageWrapper,
  StyledMessage,
} from "./style";

interface MessageProps extends Document<IMessage> {
  senderProfile: Document<IProfile> | IProfile;
  sent: boolean;
  selectMessage: (id: string) => void;
}

const MessageItem = React.memo(
  ({
    messageText,
    sent,
    date,
    id,
    selectMessage,
    senderProfile: { userName, photoURL },
  }: MessageProps) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
      setSelected((prevSel) => !prevSel);
      selectMessage(id);
    };

    return (
      <MessageWrapper onClick={handleClick} sent={sent}>
        <StyledMessage sent={sent} selected={selected}>
          <MessagePhoto>
            <RoundProfileImage
              width="40"
              height="40"
              src={photoURL}
              userName={userName}
            />
          </MessagePhoto>
          <MessageContent sent={sent}>
            <FlexRow>
              <MessageUserName selected={selected}>{userName}</MessageUserName>
              <MessageDate selected={selected}>{date}</MessageDate>
            </FlexRow>
            <MessageText>{messageText}</MessageText>
          </MessageContent>
        </StyledMessage>
      </MessageWrapper>
    );
  }
);

export default MessageItem;
