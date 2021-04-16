import { useCollection } from "@nandorojo/swr-firestore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { DisplayError } from "../Components/Error";
import { RingLoader } from "../Components/Globals";
import { ProfileFeed, ProfileHeader } from "../Components/Profile";
import { ProfileContext } from "../Context";
import { IProfile } from "../Firebase/types";

type Params = {
  userName: string;
};

const Profile = () => {
  const { userName } = useParams<Params>();
  const { data, error, loading } = useCollection<IProfile>("users", {
    listen: true,
    where: ["userName", "==", userName],
  });

  useEffect(() => {
    document.title = `${userName}'s Profile Page`;
  }, [userName]);

  if (error) return <DisplayError />;

  if (loading) return <RingLoader />;

  return data && data[0] && data[0].exists ? (
    <ProfileContext.Provider value={data[0]}>
      <ProfileHeader />
      <ProfileFeed />
    </ProfileContext.Provider>
  ) : (
    <h1>No Such User</h1>
  );
};

export default Profile;
