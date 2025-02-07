'use client';

import { useEffect, useState } from 'react';

const AboutPage = () => {
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

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        <p className="text-lg text-gray-600">
          Welcome to WeShop, your one-stop destination for the best online shopping experience. We are committed to offering top-quality products at competitive prices. Our team is passionate about delivering an exceptional shopping experience and providing customer service that goes above and beyond.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
        <p className="text-gray-600 mt-2">
          At WeShop, our mission is to provide our customers with a wide range of high-quality products, excellent customer service, and the convenience of shopping from the comfort of their own homes. We believe in building long-term relationships with our customers by offering an easy, efficient, and personalized shopping experience.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Our Values</h2>
        <ul className="list-disc ml-6 text-gray-600 mt-2">
          <li>Customer satisfaction is our top priority.</li>
          <li>We believe in transparency and honesty.</li>
          <li>Innovation drives our passion for growth.</li>
          <li>We strive for excellence in everything we do.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
