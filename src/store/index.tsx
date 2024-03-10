import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
  isThemeDark: boolean;
  toggleTheme: () => void;
}

export const useMainStore = create<Store>()(
  //          Извиняюсь за использование zustand только для смены темы я думал тут еще что нибудь будет
  devtools(
    persist(
      (set) => ({
        isThemeDark: false,
        toggleTheme: () =>
          set((state) => ({
            isThemeDark: !state.isThemeDark,
          })),
      }),
      { name: "main", version: 1 },
    ),
  ),
);
