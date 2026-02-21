"use client"
import { useIsMobile } from "@/core/hooks/is.mobile";
import { Button, Input } from "antd";
import React from "react";

const InquiryPage = () => {
    const isMobile = useIsMobile();

    return <main
        id="inquiry-page"
        className="w-dvw h-dvh flex-center"
        style={{
            backgroundImage: `url("${isMobile ? "/images/register/mobile-bg.png" : "/images/register/bg.png"}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
    >
        <div className="w-full text-center flex-col-center gap-4 p-5 pb-10 rounded-[20px] lg:border lg:border-white/10 lg:w-[600px]">
            <h1 className="font-black! font-IranNastaliq! text-3xl text-white tracking-tighter!">استعلام کد ملی</h1>
            <div className="mt-10 mx-auto! flex-center lg:w-[60%]">
                <Input
                    maxLength={11}
                    inputMode="numeric"
                    className="bg-[#FFF3E266]! border-milky! outline-none! rounded-[20px]! h-[64px]! lg:w-full! w-[300px]! text-white! font-yekanbakh!"
                    placeholder="کدملی شما"
                    classNames={{
                        input: "placeholder:text-white! placeholder:text-end! text-white!"
                    }}
                    dir="ltr"
                />
            </div>

            <div className=" lg:mt-10!">
                <Button
                    htmlType="submit"
                    // loading={isPending}
                    // disabled={isPending}
                    className="bg-milky! text-2xl! font-bold! text-[#1C514C]! border-none! h-[67px]! lg:w-[335px]! rounded-[20px]! w-[300px]! font-yekanbakh!"
                >
                    تایید
                </Button>
            </div>
        </div>
    </main>;
};

export default InquiryPage;
