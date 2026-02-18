import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import AboutEvent from "@/components/features/home/about-event";
import EventLocation from "@/components/features/home/event-location";
import GallerySlider from "@/components/features/home/gallery-slider";
import HeroSection from "@/components/features/home/hero-section";
import WaitingForStart from "@/components/features/home/waiting-for-start";
import React from "react";

const page = () => {
  return <main className="*:grow!">
    <Header />
    <HeroSection />
    <WaitingForStart />
    <AboutEvent />
    <GallerySlider />
    <EventLocation />
    <Footer />
  </main>;
};

export default page;
