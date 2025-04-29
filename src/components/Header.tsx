import { navLinks } from "@/lib/data";
import Link from "next/link";

export default function Header() {
  return (
    <div>
        <nav className="p-6 bg-black flex justify-between items-center text-white text-2xl">
            <div id="nav-links" className="flex gap-6 items-center justify-between w-[25%]">
            <div id="logo">Home</div>
            <ul className="flex gap-6 items-center justify-center">

                {navLinks.map((link) => (
                    <li className="hover:text-blue-500" key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
            </div>
            <div id="dark-toggle" className="">Toggle Dark Mode</div>
            
        </nav>
    </div>
  );
}