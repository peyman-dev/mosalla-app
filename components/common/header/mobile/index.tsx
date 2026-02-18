import Image from "next/image";
import React from "react";

const MobileNavbar = () => {
  return <nav className="grow">
    <div className="w-full absolute h-[455px] top-0 right-0 left-0">
      <Image
        src={"/images/home/mobile-header.png"}
        alt=""
        fill
      />
    </div>
  </nav>;
};

export default MobileNavbar;
