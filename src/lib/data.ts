import {
  IoCalendarOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";
import React from "react";
import { RiMovie2Line } from "react-icons/ri";

export const navLinks = [
  {
    label: "Find Tickets",
    href: "/search",
    icon: () => React.createElement(IoSearchOutline),
  },
  // {
  //     label: "Account",
  //     href: "/account",
  //     icon: () => React.createElement(IoPersonOutline),
  // },
] as const;

export const searchPageLinks = [
  {
    label: "Movie",
    href: "/search/movie",
    icon: () => React.createElement(RiMovie2Line),
  },
  {
    label: "Date",
    href: "/search/date",
    icon: () => React.createElement(IoCalendarOutline),
  },
  {
    label: "Theatre",
    href: "/search/theatre",
    icon: () => React.createElement(IoLocationOutline),
  },
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
