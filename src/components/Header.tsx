'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const Header = () => {
  const { cartItems } = useCart();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) {
    return null;
  }

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

  return (
    <header className={`fixed w-full top-0 z-50 h-16 px-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between w-full">
        {/* Logo on the left */}
        <Link href="/" className={`text-2xl font-bold hover:text-blue-700 transition-colors ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>
          WeShop
        </Link>

        {/* Right section with About Us, Profile, Cart, and Dark Mode */}
        <nav className="flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            {/* About Us Button */}
            <li>
              <Link href="/about" className="text-gray-600 dark:text-gray-200 hover:text-blue-600 transition-colors">
                About Us
              </Link>
            </li>

            {/* Profile Button */}
            <li>
              <Link href="/profile" className="flex items-center justify-center h-10 w-10 text-gray-600 dark:text-gray-200 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </li>

            {/* Cart Button */}
            <li>
              <Link href="/cart" className="flex items-center justify-center h-10 w-10 relative text-gray-600 dark:text-gray-200 hover:text-blue-600 transition-colors">
                <span className="sr-only">Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </li>

            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-between p-1"
              >
                <div
                  className={`w-4 h-4 bg-gray-900 rounded-full transition-transform duration-300 ${isDarkMode ? 'transform translate-x-6' : ''}`}
                />
                <svg
                  className={`absolute left-1 top-1 w-3 h-3 text-gray-800 dark:text-gray-100 transition-all duration-300 ${isDarkMode ? 'transform translate-x-3' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
