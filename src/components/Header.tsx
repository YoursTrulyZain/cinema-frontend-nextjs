'use client'

import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { useLoginContext } from "@/contexts/LoginContext";
import { useAuth } from "@/contexts/AuthContext";
import UserSheet from "./UserSheet";
import SearchSheet from "./SearchSheet";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Header() {
    const { openLoginModal, isLoggedIn } = useLoginContext();
    const { user, isLoading } = useAuth();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750);
        };
        
        // Initial check
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLoginClick = () => {
        if (isLoggedIn()) {
            
        } else {
            openLoginModal();
        }
    }
    
    const renderUserSection = () => {
        if (user) {
            return !isLoading ? (
                user && <UserSheet user={user} />
            ) : (
                <Skeleton className="w-10 h-10 px-20 py-6 rounded-full" />
            )
        } else {
            return (
                <div onClick={handleLoginClick} className="flex gap-2 items-center bg-black rounded-full border border-white px-5 py-2 hover:text-blue-500 cursor-pointer">
                    <IoPersonOutline /> 
                    Sign In
                </div>
            );
        }
    };
    
    // Mobile layout
    if (isMobile) {
        return (
            <div className="py-4">
                <nav className="flex justify-between items-center px-4 text-white">
                    <div className="flex items-center justify-start bg-black px-10 py-2 border rounded-full border-white">
                        <SearchSheet />
                    </div>
                    <div className="flex items-center justify-end">
                        {renderUserSection()}
                    </div>
                </nav>
            </div>
        );
    }
  
    // Desktop layout
    return (
        <div>
            <nav className="py-6 flex justify-between items-center text-white text-2xl">
                <div className="fixed left-10 top-1.5 z-10 px-10 hover:text-blue-500">
                    <Link href="/">
                        <Image
                            src="/ticketZ.png"
                            alt="TicketZ Logo"
                            width={100}
                            height={100}
                            className="h-20 w-auto rounded-full border-2 border-white antialiased hover:border-blue-500"
                        />
                    </Link>
                </div>
                <div id="nav-links" className="bg-black mt-5 px-10 py-2 border rounded-full border-white flex gap-20 items-center justify-between fixed top-0 left-1/2 -translate-x-1/2 z-10">
                    <SearchSheet />
                </div>

                <div id="logo" className="fixed right-10 top-5">
                    {renderUserSection()}
                    {/* <div><Toggle>Moon</Toggle></div> */}
                </div>
            </nav>
        </div>
    );
}