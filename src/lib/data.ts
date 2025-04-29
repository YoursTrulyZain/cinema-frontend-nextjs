import { IoHomeOutline, IoLocationOutline, IoPersonOutline, IoTicketOutline } from "react-icons/io5";
import React from "react";

export const navLinks = [
    {
        label: "Home",
        href: "/",
        icon: () => React.createElement(IoHomeOutline),
    },
    {
        label: "Tickets",
        href: "/tickets",
        icon: () => React.createElement(IoTicketOutline),
    },
    {
        label: "Theatres",
        href: "/theatres",
        icon: () => React.createElement(IoLocationOutline),
    },
    // {
    //     label: "Account",
    //     href: "/account",
    //     icon: () => React.createElement(IoPersonOutline),
    // },
] as const;

export const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        image: "/the-dark-knight.jpg",
    },
    {
        id: 2,
        title: "The Dark Knight",
        image: "/the-dark-knight.jpg",
    },
    {
        id: 3,
        title: "The Dark Knight",
        image: "/the-dark-knight.jpg",
    },
    {
        id: 4,
        title: "The Dark Knight",
        image: "/the-dark-knight.jpg",
    },
    
] as const;