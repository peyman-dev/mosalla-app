"use client";

import { useRegisterStore } from "@/core/stores/register.store";
import clsx from "clsx";
import type { ReactNode } from "react";

interface FormContainerProps {
    children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
    const { step } = useRegisterStore();
    const isWide = step === "ADD_FAMILY" || step === "RESULT";
    const isResult = step === "RESULT";

    return (
        <div
            className={clsx(
                // پایه – موبایل اول
                "w-dvw h-dvh flex flex-col",

                // دسکتاپ / lg+
                "lg:w-[812px] lg:max-h-[90dvh]",
                "lg:rounded-[50px]",
                "lg:bg-[#1C514C1A] overflow-hidden! lg:border lg:border-white/10 lg:backdrop-blur-sm",
                "lg:shadow-[inset_-14px_12px_24px_-16px_#00000060]",

                // عرض متغیر
                isWide ? "lg:min-w-[70dvw]" : "lg:min-w-[812px]"
            )}
        >
            <div
                className={clsx(
                    "flex-1 overflow-y-auto custom-scrollbar",

                    // padding پیش‌فرض
                    "py-16 px-5 sm:py-20 sm:px-6 lg:px-10",

                    // در مرحله RESULT کاملاً بدون padding داخلی (معمولاً برای صفحه نتیجه/تیکت)
                    isResult && "p-0!"
                )}
            >
                {children}
            </div>
        </div>
    );
}