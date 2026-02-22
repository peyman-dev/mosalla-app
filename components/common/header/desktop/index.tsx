import { IdCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DesktopNavbar = () => {
  return <>
    <nav className="relative">
      <div className="flex-end container pt-15 relative z-10 lg:visible! lg:flex! hidden! invisible!">
        <div className="flex-ic **:flex-ic **:gap-1.5 tracking-tighter! gap-3">
          {/* <Link className="bg-primary-green flex text-lg  py-2.5 px-3.75 text-white rounded-[10px]" href="/inquiry">
            <IdCard />
            استعلام ثبت نام
          </Link> */}
          <Link className="bg-primary-green text-lg  py-2.5 px-3.75 text-white rounded-[10px]" href="/registeration">
            ثبت نام در افطاری
          </Link>
        </div>
      </div>

      <div className="absolute grow w-full z-0 h-[961px] top-0">
        <Image
          fill
          src="/images/icons/header.png"
          alt="header"
        />
      </div>
    </nav>;
  </>
};

export default DesktopNavbar;
