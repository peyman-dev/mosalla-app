import { IdCardIcon, LucideCalendarCheck2, Users2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
    return <aside className="h-dvh md:visible md:block hidden invisible! sticky top-0 right-0 w-[260px] p-5 border-e border-primary/20 bg-primary/10">
        <header>
            <p className="text-2xl text-center font-bold text-primary">
                پنل مدیریت
            </p>
        </header>
        <main className="my-20 *:h-12 *:rounded-lg space-y-1  *:flex-ic *:gap-2 *:p-3 *:duration-150 *:transition-all *:hover:bg-primary/10 *:font-semibold! ">
            <Link href={"/panel"}>
                <Users2 />
                کاربران
            </Link>
            <Link href={"/panel/national-codes"}>
                <IdCardIcon />
                کدهای ملی
            </Link>
            <Link href={"/panel/capacities"}>
                <LucideCalendarCheck2 />
                ظرفیت ها
            </Link>
        </main>
    </aside>
};

export default Sidebar;
