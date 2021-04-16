import { Document, useCollection } from "@nandorojo/swr-firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IMessage, IProfile } from "../../Firebase/types";
import { useAuthProfile, useFirebase } from "../../Hooks";
import { DisplayError } from "../Error";
import { RingLoader } from "../Globals";
import MessageItem from "./MessageItem";
import MessagesControls from "./MessagesControls";
import { MessagesListContainer } from "./style";

type Params = {
  dialogId: string;
};

type MessagesListProps = {
  dialogProfile: Document<IProfile>;
};

const MessagesList = ({ dialogProfile }: MessagesListProps) => {
  const authProfile = useAuthProfile()!;
  const firebase = useFirebase();
  const [selected, setSelected] = useState<string[]>([]);
  const { dialogId } = useParams<Params>();
  const { data, error, loading } = useCollection<IMessage>(
    `/direct/${dialogId}/messages/`,
    { listen: true, orderBy: "timestamp" }
  );

  useEffect(() => {
    setSelected([]);
  }, [dialogId]);

  const selectMessage = useCallback((messageId: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(messageId)) {
        return prevSelected.filter((id) => id !== messageId);
      } else {
        return [...prevSelected, messageId];
      }
    });
  }, []);

  const deleteSelected = useCallback(() => {
    firebase.deleteSelected(selected, dialogId);
    setSelected([]);
  }, [firebase, dialogId, selected]);

  if (error) return <DisplayError />;

  if (loading) return <RingLoader />;

  return (
    <MessagesListContainer>
      {selected.length > 0 && (
        <MessagesControls deleteSelected={deleteSelected} />
      )}
      {data
        ? data.map(({ timestamp, ...rest }) => {
            const sent = rest.senderId !== dialogProfile.id;
            const senderProfile = sent ? authProfile : dialogProfile;
            return (
              <MessageItem
                key={rest.id}
                senderProfile={senderProfile}
                sent={sent}
                date={timestamp?.toDate().toLocaleString()}
                selectMessage={selectMessage}
                {...rest}
              />
            );
          })
        : null}
    </MessagesListContainer>
  );
};

export default MessagesList;
