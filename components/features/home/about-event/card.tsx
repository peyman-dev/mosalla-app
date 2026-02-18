import Link from "next/link";
import React from "react";

const EventCard = ({ backgroundImage, alt }: {
    backgroundImage: string;
    alt?: string;
}) => {
    return <article style={{
        backgroundImage: `url(${backgroundImage})`
    }} className="h-[360px] w-[90%]! mx-auto! bg-cover bg-center md:w-full rounded-[10px] relative overflow-hidden">
    </article>;
};

export default EventCard;
