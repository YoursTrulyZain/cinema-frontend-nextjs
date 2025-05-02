'use client'

import { createContext, useContext, useEffect, useState } from "react";

interface UserAuth {
    userId: string;
}

interface AuthContextType {
    userAuth: UserAuth | null;
    setUserAuth: React.Dispatch<React.SetStateAction<UserAuth | null>>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userAuth, setUserAuth] = useState<UserAuth | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        fetch("http://localhost:3001/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Invalid token");
            return res.json();
          })
          .then((data: UserAuth) => setUserAuth(data))
          .catch(() => {
            localStorage.removeItem("token");
            setUserAuth(null);
          });
      }, []);

      const logout = () => {
        localStorage.removeItem("token");
        setUserAuth(null);
      };

      return (
        <AuthContext.Provider value={{ userAuth, setUserAuth, logout }}>
          {children}
        </AuthContext.Provider>
      );
}

export { AuthProvider, useAuth };
