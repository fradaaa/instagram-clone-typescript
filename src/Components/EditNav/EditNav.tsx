import EditNavItem from "./EditNavItem";
import { EditNavContainer } from "./style";

const EditNav = () => {
  return (
    <EditNavContainer>
      <EditNavItem text="Edit Profile" to="/accounts/edit/profile" />
      <EditNavItem text="Change Password" to="/accounts/edit/password" />
      <EditNavItem text="Change Email" to="/accounts/edit/email" />
    </EditNavContainer>
  );
};

export default EditNav;
