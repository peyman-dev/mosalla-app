"use client"

import { logInMobile } from "@/app/actions";
import { useRegisterStore } from "@/core/stores/register.store";
import React, { useState, useEffect } from "react";

const ResendOTP = () => {
    const { phoneNumber } = useRegisterStore()
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }


        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResend = async () => {
        if (!canResend) return;
        const request = await logInMobile(phoneNumber)
        if (request?.ok) {
            setTimeLeft(120);
            setCanResend(false);
        }
    };

    return (
        <div className="flex justify-center select-none font-yekanbakh">
            {canResend ? (
                <p
                    onClick={handleResend}
                    className="cursor-pointer text-milky underline underline-offset-4"
                >
                    ارسال دوباره کد
                </p>
            ) : (
                <p className="text-white/60">
                    ارسال دوباره کد {formatTime(timeLeft)}
                </p>
            )}
        </div>
    );
};

export default ResendOTP;