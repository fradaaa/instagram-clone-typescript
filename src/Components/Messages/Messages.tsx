import { useDocument } from "@nandorojo/swr-firestore";
import { useParams } from "react-router";
import { IDialog, IProfile } from "../../Firebase/types";
import { useAuthUser } from "../../Hooks";
import { DisplayError } from "../Error";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import { MessagesContainer } from "./style";

type Params = {
  dialogId: string;
};

const Messages = () => {
  const authUser = useAuthUser();
  const { dialogId } = useParams<Params>();
  const { data, error } = useDocument<IDialog>(`/direct/${dialogId}`);
  const { data: profileData, error: profileError } = useDocument<IProfile>(
    data
      ? `/users/${data.membersArray.find((id) => id !== authUser?.uid)}`
      : null
  );

  if (error || profileError) return <DisplayError />;

  return (
    <MessagesContainer>
      {profileData ? (
        <>
          <MessagesHeader dialogProfile={profileData} />
          <MessagesList dialogProfile={profileData} />
          <MessagesForm dialogId={dialogId} />
        </>
      ) : null}
    </MessagesContainer>
  );
};

export default Messages;
