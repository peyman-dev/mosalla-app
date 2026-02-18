import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
    return (
        <section className="relative mt-[460px] flex flex-col items-center ">

            <div className="space-y-[27px] text-center">
                <p className="text-xl lg:text-[32px] font-semibold  leading-tight">
                    جشن بزرگ افطاری ماه مبارک رمضان
                    <br />
                    با حضور شما عزیزان
                </p>
                <div className="space-y-4 lg:text-2xl">
                    <div className="flex-col-center lg:flex-ic! gap-3">
                        <div className="flex-ic gap-1 text-[#90541D] font-bold lg:min-w-[140px] justify-end">
                            <MapPin size={21} />
                            مکان:
                        </div>
                        <p className="font-bold">
                            زنجان، زینبیه غربی، سبزه میدان
                        </p>
                    </div>

                    <div className="flex-col-center lg:flex-ic gap-3">
                        <div className="flex-ic gap-1 text-[#90541D] font-bold lg:min-w-[140px] justify-end">
                            <MapPin size={21} />
                            تاریخ و ساعت:
                        </div>
                        <p className="font-bold">
                            ۳۰ بهمن و ۱ و ۲ اسفند ماه – ساعت ۱۷
                        </p>
                    </div>
                </div>
            </div>
                <Link className="bg-primary-green text-2xl font-bold! mt-[59px]!  py-2.5 px-3.75 text-white rounded-[10px]" href="/registeration">
                    ثبت نام در افطاری
                </Link>
        </section>
    );
};

export default HeroSection;