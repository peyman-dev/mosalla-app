import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import SyncApp from "@/components/common/sync-app";
import AboutEvent from "@/components/features/home/about-event";
import EventLocation from "@/components/features/home/event-location";
import GallerySlider from "@/components/features/home/gallery-slider";
import HeroSection from "@/components/features/home/hero-section";
import WaitingForStart from "@/components/features/home/waiting-for-start";

const page = () => {
  return <main className="*:grow! bg-white!">
    <Header />
    <HeroSection />
    <WaitingForStart />
    <AboutEvent />
    <GallerySlider />
    <EventLocation />
    <Footer />
    <SyncApp />
  </main>;
};

export default page;
