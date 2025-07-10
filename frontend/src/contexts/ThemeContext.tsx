import React from "react";

import { THEME } from "../constants";
import useSettingsState from "@/hooks/useSettingsState";

const initialState = {
  theme: THEME.DEFAULT,
  setTheme: (layout: string) => {},
};

export const ThemeContext = React.createContext(initialState);

interface ThemeProviderType {
  children: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderType) {
  const [theme, setTheme] = useSettingsState("theme", THEME.DEFAULT);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;