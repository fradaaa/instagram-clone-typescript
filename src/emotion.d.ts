import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    primary: string;
    primaryVariant: string;
    secondary: string;
    secondaryVariant: string;
    background: string;
    surface: string;
    surface2: string;
    surface3: string;
    surface4: string;
    lightBorder: string;
    darkBorder: string;
    error: string;
    onPrimary: string;
    onPrimaryVariant: string;
    onSecondary: string;
    onBackground: string;
    onSurface: string;
    onError: string;
    isDark: boolean;
    changeTheme: () => void;
  }
}
