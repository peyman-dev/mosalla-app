import Image from "next/image";
import Link from "next/link";
import React from "react";

const DesktopNavbar = () => {
  return <>
    <nav className="relative">
      <div className="flex-end container pt-15 relative z-10">

        <div>
          <Link className="bg-primary-green text-xl  py-2.5 px-3.75 text-white rounded-[10px]" href="#">
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
