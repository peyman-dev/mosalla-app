import { create } from "zustand";

type RegisterStep = "PHONE_NUMBER" | "OTP_STEP" | "ADD_FAMILY" | "RESULT";

interface ConfirmationData {
  title: string;
  tracking_code: string;
  submitted_at: string;
  registrant: Record<string, any>;
  attendance: {
    ramadan_day: number;
    attendance_date_shamsi: string;
  };
  family_national_codes: string[];
}

interface DayOption {
  value: number;
  label: string;
  hasCapacity: boolean;
  capacity: number;
  leftCapacity: number;
}

type StoreType = {
  step: RegisterStep;
  phoneNumber: string;
  fullName: string;
  nationalCode: string;
  familyMembers: string[];
  registrationResult: ConfirmationData | null;
  selectedDay: number | null;
  setSelectedDay: (day: number | null) => void;
  days: DayOption[];
  setDays: (days: DayOption[]) => void;

  setPhoneNumber: (phone: string) => void;
  setUserInfo: (fullName: string, nationalCode: string) => void;
  setFamilyMembers: (members: string[]) => void;
  setRegistrationResult: (result: ConfirmationData) => void;
  clearRegistrationResult: () => void;
  goNextStep: (step?: RegisterStep) => void;
  goPrevStep: (step?: RegisterStep) => void;
};

export const useRegisterStore = create<StoreType>((set, get) => ({
  step: "RESULT",
  phoneNumber: "",
  fullName: "",
  nationalCode: "",
  familyMembers: [],
  registrationResult: null,
  selectedDay: null,
  days: [],

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setUserInfo: (fullName, nationalCode) => set({ fullName, nationalCode }),
  setFamilyMembers: (familyMembers) => set({ familyMembers }),
  setRegistrationResult: (result) => set({ registrationResult: result }),
  clearRegistrationResult: () => set({ registrationResult: null, selectedDay: null, days: [] }),

  setSelectedDay: (day) => set({ selectedDay: day }),
  setDays: (days) => set({ days }),

  goNextStep: (step?: RegisterStep) => {
    if (step) {
      set({ step });
      return;
    }

    const currentStep = get().step;

    switch (currentStep) {
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
        break;
    }
  },

  goPrevStep: (step?: RegisterStep) => {
    if (step) {
      set({ step });
      return;
    }

    const currentStep = get().step;

    switch (currentStep) {
      case "OTP_STEP":
        set({ step: "PHONE_NUMBER" });
        break;
      case "ADD_FAMILY":
        set({ step: "OTP_STEP" });
        break;
      case "RESULT":
        set({ step: "ADD_FAMILY" });
        break;
      default:
        break;
    }
  },
}));