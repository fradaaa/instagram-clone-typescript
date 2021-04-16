import { useMatchURL } from "../../Hooks";
import { EditNavItemContainer, EditNavLink } from "./style";

type EditNavItemProps = {
  text: string;
  to: string;
};

const EditNavItem = ({ to, text }: EditNavItemProps) => {
  const active = useMatchURL(to);

  return (
    <EditNavItemContainer active={active}>
      <EditNavLink to={to}>{text}</EditNavLink>
    </EditNavItemContainer>
  );
};

export default EditNavItem;
