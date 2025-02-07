'use client';

import RegisterForm from '../../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
