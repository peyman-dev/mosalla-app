import HamburgerMenu from "@/components/features/panel/common/hamburger-menu";
import Sidebar from "@/components/features/panel/common/sidebar";
import QueryProvider from "@/components/providers/query.provider";
import { Metadata } from "next";
import Link from "next/link";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  description: "پنل مدیریت افطاری ماه مبارک رمضان",
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <QueryProvider>
    <main id="admin-page" className="flex items-start gap-10" >
      <Sidebar />
      <section className="relative py-5 lg:py-10 h-dvh grow" id="admin-content">
        <HamburgerMenu />
        <div className="w-full h-[90%] overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
        <footer className="absolute p-2 bottom-0 right-0 left-0 flex-center text-sm">
          <Link href={"https://favajco.ir"} target="_blank" className="text-primary underline-offset-4 font-bold underline">
            &copy;
            توسعه و پشتیبانی توسط تیم فاواج
          </Link>
        </footer>
      </section>
    </main>
  </QueryProvider>
};

export default Layout;
