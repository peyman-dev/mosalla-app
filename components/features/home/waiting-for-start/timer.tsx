import React from "react";

const Timer = () => {
    return <div className="flex-center *:flex-col-center  gap-8 mt-[30px]">
        <div className="size-[192px]  rounded-[10px] flex-center rounded-lg bg-primary/10">
            <p className="text-[64px] text-primary-green font-black">
                56
            </p>
            <p>
                ثانیه
            </p>
        </div>
        <p className="text-[64px]">:</p>
        <div className="size-[192px]  rounded-[10px] flex-center rounded-lg bg-primary/10">
            <p className="text-[64px] text-primary-green font-black">
                15
            </p>
            <p>
                دقیقه
            </p>
        </div>

        <p className="text-[64px]">:</p>
        <div className="size-[192px]  rounded-[10px] flex-center rounded-lg bg-primary/10">
            <p className="text-[64px] text-primary-green font-black">
                21
            </p>
            <p>
                ساعت
            </p>
        </div>

    </div>;
};

export default Timer;
