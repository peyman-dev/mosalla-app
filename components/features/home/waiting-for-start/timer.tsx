"use client"
import React, { useState, useEffect } from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const IFTAR_TIME = { hour: 18, minute: 18 };

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let target = new Date();
            
            target.setHours(IFTAR_TIME.hour, IFTAR_TIME.minute, 0, 0);

            if (now > target) {
                target.setDate(target.getDate() + 1);
            }

            const difference = target.getTime() - now.getTime();

            setTimeLeft({
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => String(num).padStart(2, '0');

    return (
        <div dir="ltr" className="flex  justify-center items-center relative z-10 gap-2.5 lg:gap-8 mt-[30px] flex-row-reverse">
            <div className="space-y-4 lg:space-y-0">
                <div className="w-[85px] h-[85px] lg:w-[192px] lg:h-[192px] flex flex-col justify-center items-center rounded-lg bg-primary/15">
                    <p className="text-[40px] md:text-[64px] text-primary-green font-black">
                        {formatNumber(timeLeft.seconds)}
                    </p>
                    <p className="lg:block hidden font-extrabold">ثانیه</p>
                </div>
                <p className="text-center text-xl lg:hidden">ثانیه</p>
            </div>

            <p className="text-[40px] lg:text-[64px] mb-8 lg:mb-0">:</p>

            <div className="space-y-4 lg:space-y-0">
                <div className="w-[85px] h-[85px] lg:w-[192px] lg:h-[192px] flex flex-col justify-center items-center rounded-lg bg-primary/15">
                    <p className="text-[40px] md:text-[64px] text-primary-green font-black">
                        {formatNumber(timeLeft.minutes)}
                    </p>
                    <p className="lg:block hidden font-extrabold">دقیقه</p>
                </div>
                <p className="text-center text-xl lg:hidden">دقیقه</p>
            </div>

            <p className="text-[40px] lg:text-[64px] mb-8 lg:mb-0">:</p>

            <div className="space-y-4 lg:space-y-0">
                <div className="w-[85px] h-[85px] lg:w-[192px] lg:h-[192px] flex flex-col justify-center items-center rounded-lg bg-primary/15">
                    <p className="text-[40px] md:text-[64px] text-primary-green font-black">
                        {formatNumber(timeLeft.hours)}
                    </p>
                    <p className="lg:block hidden font-extrabold">ساعت</p>
                </div>
                <p className="text-center text-xl lg:hidden">ساعت</p>
            </div>
        </div>
    );
};

export default Timer;