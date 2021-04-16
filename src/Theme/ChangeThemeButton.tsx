import { useTheme } from "@emotion/react";
import { FaSun } from "react-icons/fa";
import { RiMoonFill } from "react-icons/ri";
import { ChangeThemeIcon } from "./style";

const ChangeThemeButton = () => {
  const { changeTheme, isDark } = useTheme();

  return (
    <ChangeThemeIcon
      width="25"
      height="25"
      aria-label="Change theme"
      onClick={changeTheme}
    >
      {isDark ? <FaSun /> : <RiMoonFill />}
    </ChangeThemeIcon>
  );
};

export default ChangeThemeButton;
