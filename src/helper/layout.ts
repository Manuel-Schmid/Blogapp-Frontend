import { useAuthStore } from "../store/auth";
import { setI18nLanguage } from "../main";

const updateTheme = () => {
  if (!useAuthStore().user) {
    document.documentElement.classList.remove("dark");
  } else if (!!useAuthStore().user?.profile.darkThemeActive) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const updateLanguage = () => {
  setI18nLanguage(useAuthStore().user?.profile.language.toLowerCase());
};

export { updateTheme, updateLanguage };
