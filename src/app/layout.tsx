"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import { ThemeProvider, useTheme } from "../components/other/useTheme";
import ParticlesBackground from "../components/particles/Particle";
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const inter = Inter({ subsets: ["latin"] });

function LayoutWithParticles({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: { exp: number, role: string } = jwtDecode(token);
        const isTokenExpired = decoded.exp * 1000 < Date.now();
        if (!isTokenExpired) {
          setIsAuthenticated(true);
          setIsAdmin(decoded.role === 'admin' || decoded.role === 'drendo');
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    // You might want to redirect the user to the login page here
    window.location.href = '/login';
  };

  return (
    <>
      <ParticlesBackground theme={theme} />
      <Navbar
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {children}
      <Footer />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LayoutWithParticles>{children}</LayoutWithParticles>
        </ThemeProvider>
      </body>
    </html>
  );
}