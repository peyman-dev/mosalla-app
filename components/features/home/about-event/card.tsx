import Link from "next/link";
import React from "react";

const EventCard = ({ href, backgroundImage, alt }: {
    href: string;
    backgroundImage: string;
    alt?: string;
}) => {
    return <article style={{
        backgroundImage: `url(${backgroundImage})`
    }} className="h-[360px] bg-cover bg-center w-full rounded-[10px] relative overflow-hidden">
        <Link href={href} className="size-full absolute" />
    </article>;
};

export default EventCard;
