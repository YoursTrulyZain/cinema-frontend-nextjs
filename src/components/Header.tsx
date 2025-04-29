import { navLinks } from "@/lib/data";
import Link from "next/link";
import { Toggle } from "./ui/toggle";
import { IoPersonOutline } from "react-icons/io5";

export default function Header() {
  return (
    <div>
        <nav className="py-6 flex justify-between items-center text-white text-2xl">
            <div id="nav-links" className="bg-black mt-5 px-10 py-2 border rounded-full border-white flex gap-20 items-center justify-between fixed top-0 left-1/2 -translate-x-1/2">
            <ul className="flex gap-20">
                {navLinks.map((link) => (
                    <li className="hover:text-blue-500 flex items-center gap-3 justify-center" key={link.href}>
                        {<span>{link.icon()}</span>}
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            </div>
            <div id="logo" className="fixed right-10 top-0   ">
                <div className="flex gap-2 items-center bg-black rounded-full border border-white mt-5 px-5 py-2 hover:text-blue-500">
                    <IoPersonOutline /> 
                    Sign In
                </div>
                {/* <div><Toggle>Moon</Toggle></div> */}
            </div>
        </nav>
    </div>
  );
}