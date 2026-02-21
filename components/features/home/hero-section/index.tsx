import { Clock4, IdCard, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
    return (
        <section className="relative mt-[480px] md:mt-[570px] flex flex-col items-center ">

            <div className="space-y-[27px] text-center">
                <p className="text-xl lg:text-[32px] font-semibold  leading-tight">
                    جشن بزرگ افطاری ماه مبارک رمضان
                    <br />
                    با حضور شما عزیزان
                </p>
                <div className="space-y-4 lg:text-2xl">
                    <div className="flex-col-center lg:flex-ic! gap-3">
                        <div className="flex-ic gap-1 text-[#90541D] font-bold lg:min-w-[140px] justify-end ">
                            <MapPin size={21} />
                            مکان:
                        </div>
                        <p className="font-bold">
                            زنجان,
                            بلوار دارالقرآن,
                            مصلای بزرگ خاتم الانبیاء (ص)
                        </p>
                    </div>

                    <div className="flex-col-center lg:flex-ic gap-3">
                        <div className="flex-ic gap-1 text-[#90541D] font-bold lg:min-w-[140px] justify-end ">
                            <MapPin size={21} />
                            تاریخ و ساعت:
                        </div>
                        <p className="font-bold">
                            هرشب ماه رمضان - از ساعت 16:30
                        </p>
                    </div>
                    <div className="flex-col-center lg:flex-ic gap-3">
                        <div className="flex-ic gap-1 text-[#90541D] font-bold lg:min-w-[140px] justify-end ">
                            <Clock4 size={21} />
                            زمان پذیرش:
                        </div>
                        <p className="font-bold">
                            از ساعات 16:30 تا 17:30
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-center gap-2 lg:gap-4 mt-[59px]! lg:flex-row flex-col-reverse *:w-full! *:md:max-w-max w-[80%] mx-auto **:flex-center">
                <Link className="bg-primary-green flex-center gap-1.5 text-lg  py-2.5 px-3.75 text-white rounded-[10px]" href="/inquiry">
                    <IdCard />
                    استعلام ثبت نام
                </Link>
                <Link className="bg-primary-green text-lg  py-2.5 px-3.75 text-white rounded-[10px]" href="/registeration">
                    ثبت نام در افطاری
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;