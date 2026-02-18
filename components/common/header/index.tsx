"use client"
import { useIsMobile } from "@/core/hooks/is.mobile";
import React from "react";
import MobileNavbar from "./mobile";
import DesktopNavbar from "./desktop";

const Header = () => {
    const isMobile = useIsMobile();


    return <header>
            {
                isMobile ? <MobileNavbar /> : <DesktopNavbar />
            }
    </header>
};

export default Header;
