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
          <AuthProvider>
            <LayoutWithParticles>{children}</LayoutWithParticles>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}