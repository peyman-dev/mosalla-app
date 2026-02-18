"use client"
import Image from "next/image";
import React from "react";
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GallerySlider = () => {
    const images = ["/images/home/1.jpg", "/images/home/2.jpg", "/images/home/3.jpg", "/images/home/4.jpg", "/images/home/5.jpg", "/images/home/6.jpg", "/images/home/7.jpg", "/images/home/8.jpg", "/images/home/9.jpg", "/images/home/10.jpg",]
    return <section className="my-20 md:my-40 w-[98%] mx-auto">
        <h3 className="flex justify-center items-center relative z-1 text-[32px] md:text-[64px] text-primary font-IranNastaliq!">
            برخی از تصاویر مراسم
        </h3>
        <Swiper
            className="h-[300px] md:h-[480px] mt-10 !pb-12"
            loop
            modules={[Autoplay, Pagination]}
            centeredSlides
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            autoplay={{
                delay: 2200
            }}
            slidesPerView={1.3}
            spaceBetween={10}
            breakpoints={{
                640: {
                    slidesPerView: 2.2,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 3.4,
                    spaceBetween: 0,
                },
            }}
            style={{
                "--swiper-pagination-color": "#90541d",
                "--swiper-pagination-bullet-inactive-color": "#999",
                "--swiper-pagination-bullet-inactive-opacity": "0.5",
                "--swiper-pagination-bullet-size": "10px",
                "--swiper-pagination-bullet-horizontal-gap": "6px"
            } as React.CSSProperties}
        >
            {
                images.map((src, i) => (
                    <SwiperSlide key={i} className="[&.swiper-slide-active]:scale-100! [&.swiper-slide-active]:*:opacity-100! scale-90 transition-all! duration-150! bg-black rounded-3xl! overflow-hidden *:opacity-90">
                        <Image
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-2xl"
                            alt={`تصویر ${i + 1}`}
                            src={src}
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </section>;
};

export default GallerySlider;