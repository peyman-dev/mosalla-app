"use client";

import { useState } from "react";
import { Drawer, Button } from "antd";
import { Menu } from "lucide-react";
import Link from "next/link";
import { IdCardIcon, CalendarCheck2, Users2 } from "lucide-react";

const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <div className="mx-5">
                <Button
                    type="text"
                    icon={<Menu size={24} />}
                    onClick={showDrawer}
                    className="text-zinc-700 hover:text-primary md:hidden md:invisible"
                    aria-label="باز کردن منوی ناوبری"
                />
            </div>

            <Drawer
                title={
                    <div className="text-xl font-bold text-primary w-full text-right">
                        پنل مدیریت
                    </div>
                }
                placement="right"
                className="**:font-yekanbakh!"
                onClose={onClose}
                open={open}
                width={280}
                closable={true}
                maskClosable={true}
                classNames={{
                    body: "p-0 !bg-zinc-50",
                    header: "border-b border-zinc-100 !px-6 !py-4",
                    content: "!bg-zinc-50 p-0!",
                    mask: "!bg-black/40",
                }}
                style={{ direction: "rtl", textAlign: "right" }}
            >
                <div className="flex w-full! flex-col h-full">
                    <div className="flex-1 w-full! py-3 space-y-2">
                        <Link
                            href="/panel"
                            onClick={onClose}
                            className="flex items-center gap-3 h-10 w-full! rounded-xl px-4 font-medium text-zinc-800! hover:bg-primary/10 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20 active:bg-primary/5"
                        >
                            <Users2 size={22} strokeWidth={2.1} />
                            کاربران
                        </Link>

                        {/* <Link
                            href="/panel/national-codes"
                            onClick={onClose}
                            className="flex items-center gap-3 h-10 w-full! rounded-xl px-4 font-medium text-zinc-800! hover:bg-primary/10 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20 active:bg-primary/5"
                        >
                            <IdCardIcon size={22} strokeWidth={2.1} />
                            کدهای ملی
                        </Link> */}

                        <Link
                            href="/panel/capacities"
                            onClick={onClose}
                            className="flex items-center gap-3 h-10 w-full! rounded-xl px-4 font-medium text-zinc-800! hover:bg-primary/10 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20 active:bg-primary/5"
                        >
                            <CalendarCheck2 size={22} strokeWidth={2.1} />
                            ظرفیت‌ها
                        </Link>
                    </div>

                    <div className="border-t border-zinc-200 p-5 mt-auto">
                        <div className="text-xs text-zinc-500 text-center">
                            نسخه ۱.۰.۰ • {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default HamburgerMenu;