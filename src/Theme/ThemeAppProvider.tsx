import { ThemeProvider } from "@emotion/react";
import { useCallback, useState } from "react";
import { darkTheme, lightTheme } from "./themes";

const ThemeAppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(
    true || window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const currentTheme = isDark ? darkTheme : lightTheme;

  const changeTheme = useCallback(() => {
    setIsDark((isDark) => !isDark);
  }, []);

  return (
    <ThemeProvider theme={{ ...currentTheme, isDark, changeTheme }}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeAppProvider;
