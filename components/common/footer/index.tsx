"use client"
import { useIsMobile } from "@/core/hooks/is.mobile";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    const isMobile = useIsMobile()
    return <footer className=" pt-24 bg-[#F9EDCE] relative mt-25.5">
        <Image
            src="/images/icons/footer-pattern.png"
            width={isMobile ? 160 : 236}
            height={isMobile ? 160 : 234}
            alt=""
            className="absolute top-0 right-0"
        />
        <div className="relative z-1 size-full">
            <h6 className="text-center text-2xl font-bold flex-col-center gap-y-5 lg:flex-center! gap-3">
                همین حالا ثبت نام کن و در افطاری
                <span className="font-IranNastaliq font-normal! text-primary  lg:pt-0 text-4xl lg:text-[64px]">
                    ماه مبارک رمضان
                </span>
                در کنار ما مهمان خدا باش.
            </h6>

            <div className="flex-center mt-8">
                <Link className="bg-primary-green text-2xl font-bold!  py-2.5 px-3.75 text-white rounded-[10px]" href="/registeration">
                    ثبت نام در افطاری
                </Link>
            </div>
            <div className="mt-16.75 flex-col-center gap-3">
                <p className="text-xl font-bold">ما را در شبکه های اجتماعی دنبال کنید</p>
                <div className="flex-center gap-4.5 *:border *:border-primary-green/20 **:text-primary-green! *:size-[50px] *:cursor-pointer *:duration-150 *:transition-all *:hover:bg-primary-green/10 *:rounded-[20px]! *:flex-center">
                    <div>
                        <Instagram />
                    </div>
                    <div>
                        <Linkedin />
                    </div>
                    <div>
                        <Youtube />
                    </div>
                </div>
            </div>
            <div className="text-xs mt-10 flex-center">
                <p className="font-bold!">
                    توسعه یافته توسط تیم <Link href="https://favajco.ir"  className="text-primary underline">فاواج</Link>
                </p>

            </div>
        </div>


        <Image
            height={292}
            width={102}
            alt=""
            src={"/images/icons/fanoos.png"}
            className="absolute left-8.25 lg:left-[254px] top-0"
        />

        <div className="relative -bottom-0 mt-10 right-0 left-0 bg-size-[45px] lg:bg-size-[auto] w-full mx-auto h-[45px] bg-bottom lg:h-[69px] bg-repeat-x bg-[url('/images/icons/footer-shape.png')]"></div>
    </footer>;
};

export default Footer;
