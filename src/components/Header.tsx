'use client'

import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { useLoginContext } from "@/contexts/LoginContext";
import { useAuth } from "@/contexts/AuthContext";
import UserSheet from "./UserSheet";
import SearchSheet from "./SearchSheet";

export default function Header() {
    const { openLoginModal, isLoggedIn } = useLoginContext();
    const { user } = useAuth();

    const handleLoginClick = () => {
        if (isLoggedIn()) {
            
        } else {
            openLoginModal();
        }
    }
    
  return (
    <div>
        <nav className="py-6 flex justify-between items-center text-white text-2xl">
        <div className="fixed left-10 top-1.5 z-10 px-10 hover:text-blue-500">
            <Link href="/">
            <img
                src="/ticketZ.png"
                alt="TicketZ Logo"
                className="h-20 w-auto rounded-full border-2 border-white antialiased hover:border-blue-500"
            />
            </Link>
            
        </div>
            <div id="nav-links" className="bg-black mt-5 px-10 py-2 border rounded-full border-white flex gap-20 items-center justify-between fixed top-0 left-1/2 -translate-x-1/2 z-10">
                <SearchSheet />
            </div>
            <div id="logo" className="fixed right-10 top-5">
                {user ? (
                        <UserSheet user={user} />
                ) : (
                    <div onClick={handleLoginClick} className="flex gap-2 items-center bg-black rounded-full border border-white px-5 py-2 hover:text-blue-500 cursor-pointer">
                        <IoPersonOutline /> 
                        Sign In
                    </div>
                )}
                {/* <div><Toggle>Moon</Toggle></div> */}
            </div>
        </nav>
    </div>
  );
}