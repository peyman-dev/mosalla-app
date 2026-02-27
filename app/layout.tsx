import type { Metadata } from "next";
import "@/public/css/globals.css"
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import QueryProvider from "@/components/providers/query.provider";


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
        <QueryProvider>

          {children}
          <ToastContainer stacked position="top-center" className={"**:font-yekanbakh! text-sm!"} toastClassName={"bg-[#184642]! border! border-white/20! text-white! **:text-white!"} />
        </QueryProvider>
      </body>
    </html>
  );
}
