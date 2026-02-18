"use client"
import React from "react";
import Timer from "./timer";
import Image from "next/image";
import { useIsMobile } from "@/core/hooks/is.mobile";

const WaitingForStart = () => {
    const isMobile = useIsMobile()
    return <section className="mt-[75px] relative">

        <Image
            src="/images/icons/patterns.png"
            alt="pattern"
            className="absolute! top-10 rotate-180 -right-[10%]"
            width={isMobile ? 240 : 600}
            height={isMobile ? 98 : 347}
        />



        <h2 className="flex-center relative text-[48px] md:text-[64px] text-primary font-IranNastaliq!">
            تا زمان شروع مراسم
        </h2>

        <Timer
        />

        <Image
            src="/images/icons/patterns.png"
            width={isMobile ? 240 : 600}
            height={isMobile ? 98 : 347}
            alt="pattern"
            className="absolute! -z-1 -top-40 -left-[10%]"
        />
    </section>;
};

export default WaitingForStart;
