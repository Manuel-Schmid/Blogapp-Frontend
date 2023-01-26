import { useAuthStore } from "../store/auth";

const updateTheme = () => {
  if (!useAuthStore().user) {
    document.documentElement.classList.remove("dark");
  } else if (!!useAuthStore().user?.profile.darkThemeActive) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export { updateTheme };
