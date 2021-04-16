import { useDocument } from "@nandorojo/swr-firestore";
import React from "react";
import { useHistory, useRouteMatch } from "react-router";
import { IProfile } from "../../Firebase/types";
import { useMatchURL } from "../../Hooks";
import { DisplayError } from "../Error";
import { RoundProfileImage } from "../Globals";
import { DialogInfo, DialogPhoto, DialogUserName, StyledDialog } from "./style";

type DialogItemProps = {
  profileId: string;
  dialogId: string;
  filterString: string;
};

const DialogItem = React.memo(
  ({ profileId, dialogId, filterString }: DialogItemProps) => {
    const { data, error } = useDocument<IProfile>(`/users/${profileId}`);
    const match = useRouteMatch();
    const history = useHistory();
    const dialogURL = `${match.path}/${dialogId}`;
    const active = useMatchURL(dialogURL);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      history.push(dialogURL);
    };

    if (error) return <DisplayError />;

    return data && data.userName.includes(filterString) ? (
      <StyledDialog onClick={handleClick} active={active}>
        <DialogPhoto>
          <RoundProfileImage
            width="40"
            height="40"
            src={data.photoURL}
            userName={data.userName}
          />
        </DialogPhoto>
        <DialogInfo>
          <DialogUserName>{data.userName}</DialogUserName>
        </DialogInfo>
      </StyledDialog>
    ) : null;
  }
);

export default DialogItem;
