'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useRouter } from 'next/navigation';

const ProfileDetails = () => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-300">
      <p className="text-lg text-gray-700">Name: {user.name}</p>
      <p className="text-lg text-gray-700">Email: {user.email}</p>
      <p className="text-lg text-gray-700">Role: {user.role}</p>

      <button
        onClick={handleLogout}
        className={`mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoggingOut ? 'bg-blue-400 cursor-not-allowed' : ''}`}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <svg
            className="animate-spin h-5 w-5 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v7m0 0l3-3m-3 3l-3-3m6 13H6m6 0c3.313 0 6-2.687 6-6 0-3.313-2.687-6-6-6"
            />
          </svg>
        ) : (
          'Logout'
        )}
      </button>
    </div>
  );
};

export default ProfileDetails;
