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
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3001/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!res.ok) throw new Error("Invalid token");
  
        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);

      const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ user, setUser, logout, refreshUser: fetchUser, isLoading }}>
          {children}
        </AuthContext.Provider>
      );
}

export { AuthProvider, useAuth };
