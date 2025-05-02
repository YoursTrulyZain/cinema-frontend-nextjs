import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LoginProvider } from "@/contexts/LoginContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinema App",
  description: "Cinema App to buy tickets to movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  bg-gradient-to-b from-black via-[#4169e1] to-black text-white antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <LoginProvider>
            <Header />
            {children}
            <Footer />
          </LoginProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
