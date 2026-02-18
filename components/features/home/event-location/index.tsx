"use client"
import { useIsMobile } from "@/core/hooks/is.mobile";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const EventLocation = () => {
    const isMobile = useIsMobile()
    return <section className="relative my-[103px]!">

        <Image
            src="/images/icons/patterns.png"
            alt="pattern"
            className="absolute! -top-40 lg:top-10 rotate-180 -right-[10%]"
            width={isMobile ? 240 : 600}
            height={isMobile ? 98 : 347}
        />

        <h3 className="flex-center relative z-1 text-[48px] md:text-[64px] text-primary font-IranNastaliq!">
            اطلاعات مکان
        </h3>
        <div className="mt-15 relative z-1 flex-center">
            <iframe
                width="900"
                height={isMobile ? 253 : "533"}
                style={{ border: 0, borderRadius: "20px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.3!2d48.499278!3d36.683529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ff61099148cd75f%3A0x590c36c0158f6c64!2sKhatam%20Al-Anbia%20Musalla!5e0!3m2!1sen!2s!4vYOUR_EMBED_TIMESTAMP!5m2!1sen!2s"
            ></iframe>
        </div>
        <div className="mt-8 flex-col-center lg:flex-center gap-3">
            <p className="flex-ic text-primary text-base md:text-xl lg:text-2xl font-bold gap-1">
                <MapPin />
                <span>مکان:</span>
            </p>
            <p className="mtext-base d:text-xl lg:text-2xl font-bold">
                زنجان,
                بلوار دارالقرآن,
                مصلای بزرگ خاتم الانبیاء (ص) 

            </p>
        </div>
    </section>;
};

export default EventLocation;
