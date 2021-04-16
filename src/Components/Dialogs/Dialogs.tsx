import { useCollection } from "@nandorojo/swr-firestore";
import { useCallback, useState } from "react";
import { IDialog } from "../../Firebase/types";
import { useAuthUser } from "../../Hooks";
import { DisplayError } from "../Error";
import { RingLoader } from "../Globals";
import DialogItem from "./DialogItem";
import FilterDialogs from "./FilterDialogs";
import { DialogsContainer } from "./style";

const Dialogs = () => {
  const authUser = useAuthUser();
  const [filterString, setFilterString] = useState("");
  const { data, error } = useCollection<IDialog>("/direct", {
    listen: true,
    where: ["membersArray", "array-contains", authUser?.uid],
    orderBy: ["lastUpdate", "desc"],
  });

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value);
  }, []);

  const clearInput = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setFilterString("");
  }, []);

  if (error) return <DisplayError />;

  return (
    <DialogsContainer>
      <>
        <FilterDialogs
          value={filterString}
          onСhange={changeInput}
          clearInput={clearInput}
        />
        {data ? (
          data.map(({ id, membersArray }) => {
            const profileId = membersArray.find((id) => id !== authUser?.uid)!;
            return (
              <DialogItem
                key={id}
                profileId={profileId}
                filterString={filterString}
                dialogId={id}
              />
            );
          })
        ) : (
          <RingLoader />
        )}
      </>
    </DialogsContainer>
  );
};

export default Dialogs;
