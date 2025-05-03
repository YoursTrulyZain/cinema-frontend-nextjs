'use client'

import { AuthContextType, User } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        fetch("http://localhost:3001/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Invalid token");
            return res.json();
          })
          .then((data: User) => setUser(data))
          .catch(() => {
            localStorage.removeItem("token");
            setUser(null);
          });
      }, []);

      const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
          {children}
        </AuthContext.Provider>
      );
}

export { AuthProvider, useAuth };
