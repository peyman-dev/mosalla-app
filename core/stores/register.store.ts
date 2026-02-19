import { create } from "zustand";

type RegisterStep = "PHONE_NUMBER" | "OTP_STEP" | "ADD_FAMILY" | "RESULT";

interface ConfirmationData {
  title: string;
  tracking_code: string;
  submitted_at: string;
  registrant: Record<string, any>;
  attendance: {
    ramadan_day: number;
    attendance_timestamp: string;
  };
  family_national_codes: string[];
}

type StoreType = {
  step: RegisterStep;
  phoneNumber: string;
  fullName: string;
  nationalCode: string;
  familyMembers: string[];
  registrationResult: ConfirmationData | null;

  setPhoneNumber: (phone: string) => void;
  setUserInfo: (fullName: string, nationalCode: string) => void;
  setFamilyMembers: (members: string[]) => void;
  setRegistrationResult: (result: ConfirmationData) => void;
  clearRegistrationResult: () => void;
  goNextStep: (step?: RegisterStep) => void;
  goPrevStep: (step?: RegisterStep) => void;
};

export const useRegisterStore = create<StoreType>((set, get) => ({
  step: "PHONE_NUMBER",
  phoneNumber: "",
  fullName: "",
  nationalCode: "",
  familyMembers: [],
  registrationResult: null,

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setUserInfo: (fullName, nationalCode) => set({ fullName, nationalCode }),
  setFamilyMembers: (familyMembers) => set({ familyMembers }),
  setRegistrationResult: (result) => set({ registrationResult: result }),
  clearRegistrationResult: () => set({ registrationResult: null }),

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
          break;
        case "RESULT":
          // می‌تونی اینجا ریست کنی یا برگردونی به ابتدا
          break;
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
        case "RESULT":
          set({ step: "ADD_FAMILY" });
          break;
      }
    }
  },
}));
