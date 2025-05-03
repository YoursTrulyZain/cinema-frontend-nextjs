'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (token: string) => void;
}

function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      const userRes = await fetch("http://localhost:3001/user/me", {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      const userData = await userRes.json();
      setUser(userData);
      onLoginSuccess(data.accessToken); // Save token later
      onClose();
    } catch (err) {
      setError("Login failed. Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md flex flex-col gap-4  justify-center text-black">
            
            <div className='flex justify-between items-center'>
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-bold'>Login</h1>
                        <IoCloseOutline onClick={onClose} className='text-2xl cursor-pointer' />
                    </div>
                    
                    <p className='text-sm text-gray-500'>Don't have an account? <Link href="/signup" className='text-blue-500 underline'>Sign up</Link></p>
                </div>
            </div>
            <div>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </form>
            </div>
            <div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div>
                {isLoading ? (
                    <Button type="submit"  onClick={handleSubmit} className='bg-black w-full text-white cursor-pointer py-3' disabled><div className="w-4 h-4 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div> Please Wait</Button>
                    
                ) : (
                    <Button type="submit"  onClick={handleSubmit} className='bg-black w-full text-white cursor-pointer py-3' disabled={!email || !password}>Login</Button>
                )}
            </div>
        </div>
    </div>
    
  )
}

export default LoginModal