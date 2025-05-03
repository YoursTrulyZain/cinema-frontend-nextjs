'use client'

import LoginModal from "@/components/LoginModal";
import { LoginContextType } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const LoginContext = createContext<LoginContextType | undefined>(undefined);

const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (!context) throw new Error('useLoginContext must be used within a LoginProvider');
    return context;
}
 
function LoginProvider({ children }: { children: React.ReactNode }) {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const openLoginModal = () => {
        setShowLoginModal(true);
    }
    
    const handleLoginSuccess = (token: string) => {
        localStorage.setItem('token', token);
        setShowLoginModal(false);
    }

    const isLoggedIn = () => !!localStorage.getItem('token');
    
    return (
        <LoginContext.Provider value={{ openLoginModal, isLoggedIn }}>
          {children}
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </LoginContext.Provider>
      );
}

export { LoginProvider, useLoginContext };