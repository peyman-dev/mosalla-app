import React from "react";
import Timer from "./timer";
import Image from "next/image";

const WaitingForStart = () => {
    return <section className="mt-[75px] relative">

        <Image
            src="/images/icons/patterns.png"
            alt="pattern"
            className="absolute! top-10 rotate-180 -right-[10%]"
            width={600}
            height={347}
        />



        <h2 className="flex-center text-[64px] text-primary font-IranNastaliq!">
            تا زمان شروع مراسم
        </h2>

        <Timer

        />

        <Image
            src="/images/icons/patterns.png"
            width={600}
            height={347}
            alt="pattern"
            className="absolute! -z-1 -top-40 -left-[10%]"
        />
    </section>;
};

export default WaitingForStart;
