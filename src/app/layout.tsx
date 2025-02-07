'use client';

import { ReactNode, useEffect, useState } from 'react';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';  // Make sure the global styles are imported here

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) return null; // Prevent rendering until the component is mounted

  return (
    <CartProvider>
      {/* Pass the toggleTheme and isDarkMode to the Header component */}
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      {children}
    </CartProvider>
  );
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
