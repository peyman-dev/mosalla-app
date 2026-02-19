import { create } from "zustand";

type SettingsStore = {
  view: "DESKTOP" | "MOBILE";
  setView: (view: "DESKTOP" | "MOBILE") => void;

  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  toggle: (customState?: boolean) => void;
};

export const useSettings = create<SettingsStore>((set, get) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    set({ isOpen });
  },

  view: "DESKTOP",
  setView(view) {
    set({ view });
  },

  toggle(customState?: boolean) {
    set({
      isOpen: typeof customState == "boolean" ? customState : !get().isOpen,
    });
  },
}));
