"use client"
import { useRegisterStore } from "@/core/stores/register.store";
import clsx from "clsx";
import React, { ReactNode } from "react";

const FormContainer = ({ children }: {
    children: ReactNode
}) => {
    const { step } = useRegisterStore()
    const isResult = step == "RESULT"

    const uiCSS = clsx(
        "w-dvw lg:w-[812px] lg:max-h-[90dvh] h-dvh! lg:shadow-[inset_-14px_12px_24px_-16px_#00000060] lg:rounded-[50px] lg:bg-[#1C514C1A] lg:border border-white/10 lg:backdrop-blur-sm flex flex-col",
        step == "ADD_FAMILY" || step == "RESULT" ? "lg:min-w-[70dvw]" : "lg:min-w-[812px]"
    )

    return (
        <div className={uiCSS}>
            <div className="flex-1 h-full! min-h-full! *:h-full! py-20 overflow-y-auto custom-scrollbar ">
                {children}
            </div>
        </div>
    );
};

export default FormContainer;