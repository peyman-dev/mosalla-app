import type { Metadata } from "next";
import "@/public/css/globals.css"
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "مراسم ماه رمضان - مصلای بزرگ خاتم الانبیاء",
  description: "مراسم ماه رمضان - مصلای بزرگ خاتم الانبیاء",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body
      >
        {children}
        <ToastContainer stacked position="top-center" className={"**:font-yekanbakh! text-sm!"} toastClassName={"bg-[#184642]! border! border-white/20! text-white! **:text-white!"}/>
      </body>
    </html>
  );
}
