import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Store {
  isThemeDark: boolean;
  toggleTheme: () => void;
  location: {
    latitude: number;
    longitude: number;
  };
  setLocation: (latitude: number, longitude: number) => void;
}

export const useMainStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        isThemeDark: false,
        toggleTheme: () =>
          set((state) => ({
            isThemeDark: !state.isThemeDark,
          })),
        location: {
          latitude: 0,
          longitude: 0,
        },
        setLocation: (latitude: number, longitude: number) =>
          set((state) => ({
            ...state,
            location: { latitude, longitude },
          })),
      }),
      { name: "main", version: 1 },
    ),
  ),
);
