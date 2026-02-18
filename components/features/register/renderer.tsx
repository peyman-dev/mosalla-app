"use client"
import { useRegisterStore } from "@/core/stores/register.store";
import { ReactNode } from "react";

const Renderer = ({
    PhoneNumberStep,
    OtpStep,
    AddFamilyStep,
    ResultStep
}: {
    PhoneNumberStep: ReactNode;
    OtpStep: ReactNode;
    AddFamilyStep: ReactNode;
    ResultStep: ReactNode
}) => {
    const { step } = useRegisterStore();

    switch (step) {
        case "PHONE_NUMBER":
            return PhoneNumberStep;
        case "OTP_STEP":
            return OtpStep;
        case "ADD_FAMILY":
            return AddFamilyStep;
            case "RESULT":
                return ResultStep
    }

};

export default Renderer;
