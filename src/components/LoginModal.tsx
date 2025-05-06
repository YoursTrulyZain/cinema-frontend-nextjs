'use client';

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "./Modal";

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

  // Reset form state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  // Create a ref for the form element
  const formRef = React.useRef<HTMLFormElement>(null);

  // Focus the email input when the modal opens
  React.useEffect(() => {
    if (isOpen && formRef.current) {
      const emailInput = formRef.current.querySelector('input[type="email"]');
      if (emailInput) {
        setTimeout(() => {
          (emailInput as HTMLInputElement).focus();
        }, 100);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("api.cinema.z41n.dev/auth/login", {
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

      const userRes = await fetch("api.cinema.z41n.dev/user/me", {
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
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login">
      <div className="flex flex-col gap-4">
        <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="z-[10000]"
            tabIndex={1}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="z-[10000]"
            tabIndex={2}
          />
          <div>{error && <p className="text-red-500">{error}</p>}</div>
          <div>
            {isLoading ? (
              <Button
                type="submit"
                className="bg-black w-full text-white cursor-pointer py-3 z-[10000]"
                disabled
                tabIndex={-1}
              >
                <div className="w-4 h-4 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>{" "}
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-black w-full text-white cursor-pointer py-3 z-[10000]"
                disabled={!email || !password}
                tabIndex={3}
              >
                Login
              </Button>
            )}
          </div>
          {/* <p className='text-sm text-gray-500 text-center pt-2'>Don&apos;t have an account? <Link href="/signup" className='text-blue-500 underline z-[10000]' tabIndex={4}>Sign up</Link></p> */}
        </form>
      </div>
    </Modal>
  );
}

export default LoginModal;
