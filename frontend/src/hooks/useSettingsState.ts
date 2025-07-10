import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useSettingsState(key: any, initialValue: string) {
  const [value, setValue] = useLocalStorage(key, initialValue);

  useEffect(() => {
    document.body.dataset[key] = value;

    if (key === "theme") {
      const theme = value === "dark" ? "dark" : "light";

      const stylesheet = document.querySelector(".js-stylesheet");
      if (stylesheet) {
        if (import.meta.env.PROD) {
          stylesheet.setAttribute("href", `/assets/${theme}.css`);
        } else {
          stylesheet.setAttribute("href", `/src/assets/scss/${theme}.scss`);
        }
      }
    }
  }, [value, key]);

  return [value, setValue];
}

export default useSettingsState;