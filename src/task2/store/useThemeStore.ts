import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

const stored = localStorage.getItem("theme");

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: stored === "dark",
  toggleTheme: () =>
    set((state) => {
      const value = !state.isDark;
      localStorage.setItem("theme", value ? "dark" : "light");
      return { isDark: value };
    }),
}));
