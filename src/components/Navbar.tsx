import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600">WeShop</h1>
        </div>
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
          <li><Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link></li>
          <li><Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link></li>
        </ul>
        <div className="relative">
          <Link to="/cart">
            <FaShoppingCart className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-1 rounded-full">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;