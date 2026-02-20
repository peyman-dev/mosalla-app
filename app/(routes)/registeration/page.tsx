"use client"
import FormContainer from "@/components/features/register/form-container";
import Renderer from "@/components/features/register/renderer";
import AddFamilyStep from "@/components/features/register/steps/add-family";
import OTPStep from "@/components/features/register/steps/otp-step";
import PhoneNumberStep from "@/components/features/register/steps/phone-number";
import ResultStep from "@/components/features/register/steps/result";
import { useIsMobile } from "@/core/hooks/is.mobile";

const RegisterationPage = () => {
    const isMobile = useIsMobile()
    return <div 
        style={{
            backgroundImage: `url("${isMobile ? "/images/register/mobile-bg.png" : "/images/register/bg.png"}")`
        }}
    className="bg-cover bg-center bg-no-repeat text-white w-dvw h-dvh flex-center">
        <FormContainer>
            <Renderer
                PhoneNumberStep={<PhoneNumberStep />}
                OtpStep={<OTPStep />}
                AddFamilyStep={<AddFamilyStep />}
                ResultStep={<ResultStep />}
            />
        </FormContainer>
    </div>;
};

export default RegisterationPage;
