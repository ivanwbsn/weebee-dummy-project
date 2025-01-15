import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

const Register: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setErrorMessage('This email is already registered.');
      return;
    }

    const newUser = {
      email,
      name,
      password,
      avatar,
    };

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        alert(`User registered successfully: ${createdUser.name}`);
        setEmail('');
        setName('');
        setPassword('');
        setAvatar('');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('An error occurred while registering.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Register</h1>
      <form onSubmit={handleRegister}>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block text-gray-700 font-medium mb-1"
          >
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
