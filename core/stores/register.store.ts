import { create } from "zustand";

type RegisterStep = "PHONE_NUMBER" | "OTP_STEP" | "ADD_FAMILY" | "RESULT";

type StoreType = {
  step: RegisterStep;
  phoneNumber: string;
  fullName: string;
  nationalCode: string;
  familyMembers: string[];
  setPhoneNumber: (phone: string) => void;
  setUserInfo: (fullName: string, nationalCode: string) => void;
  setFamilyMembers: (members: string[]) => void;
  goNextStep: (step?: RegisterStep) => void;
  goPrevStep: (step?: RegisterStep) => void;
};

export const useRegisterStore = create<StoreType>((set, get) => ({
  step: "PHONE_NUMBER",
  phoneNumber: "",
  fullName: "",
  nationalCode: "",
  familyMembers: [],
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setUserInfo: (fullName, nationalCode) => set({ fullName, nationalCode }),
  setFamilyMembers: (familyMembers) => set({ familyMembers }),
  goNextStep: (step?: RegisterStep) => {
    if (step) {
      set({ step });
    } else {
      const internalStep = get().step;
      switch (internalStep) {
        case "PHONE_NUMBER":
          set({ step: "OTP_STEP" });
          break;
        case "OTP_STEP":
          set({ step: "ADD_FAMILY" });
          break;
        case "ADD_FAMILY":
          set({ step: "RESULT" });
      }
    }
  },
  goPrevStep: (step?: RegisterStep) => {
    if (step) {
      set({ step });
    } else {
      const internalStep = get().step;
      switch (internalStep) {
        case "OTP_STEP":
          set({ step: "PHONE_NUMBER" });
          break;
        case "ADD_FAMILY":
          set({ step: "OTP_STEP" });
          break;
      }
    }
  },
}));
