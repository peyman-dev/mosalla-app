import React from "react";
import EventCard from "./card";
import Image from "next/image";

const AboutEvent = () => {
    const data = [
        {
            backgroundImage: "/images/home/speech.png",
            href: "/speech"
        },
        {
            backgroundImage: "/images/home/eftari.png",
            href: "/eftari"
        },
        {
            backgroundImage: "/images/home/quran.png",
            href: "/quran"
        }
    ]

    return <section className="mt-[113px] relative space-y-12">
        <h3 className="flex-center text-[64px] text-primary font-IranNastaliq!">
            درباره مراسم
        </h3>
        <div className="grid relative z-10 md:grid-cols-2 lg:grid-cols-3 gap-8 container">
            {
                Array.from(data).map((item, i) => <EventCard {...item} key={i} />)
            }

            <Image
                src="/images/icons/circle-pattern.png"
                alt=""
                width={203}
                height={203}
                className="absolute -bottom-28 -z-1 -right-20"
            />
        </div>

        <Image
            src="/images/icons/patterns.png"
            alt="pattern"
            className="absolute! -top-40 -left-[10%]"
            width={600}
            height={347}
        />
    </section>;
};

export default AboutEvent;
