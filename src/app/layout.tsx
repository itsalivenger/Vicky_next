"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import { ThemeProvider, useTheme } from "../components/other/useTheme";
import ParticlesBackground from "../components/particles/Particle";
import React from 'react';
import { AuthProvider, useAuth } from '../components/auth/AuthContext';
import NotFound from "./not-found";

const inter = Inter({ subsets: ["latin"] });

function LayoutWithParticles({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin, handleLogout } = useAuth();

  return (
    <>
      <ParticlesBackground theme={theme} />
      <Navbar
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLogout={handleLogout}
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
  const expirationDate = new Date('2025-03-31');
  const currentDate = new Date();

  if (currentDate > expirationDate) {
    return (
      <html lang="en">
        <body className={inter.className}>
          {/* white colored text in tailwind*/}
          <h1 className="text-white">La version de la page a expiré</h1>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <LayoutWithParticles>{children}</LayoutWithParticles>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}