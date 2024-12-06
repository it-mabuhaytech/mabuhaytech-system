// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import withAuth from '@/hoc/withAuth';

const Login = () => {
  const [username_input, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username_input, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message);
      console.log(error);
    } else {
      // Handle successful login (e.g., redirect or set user state)
      const data = await response.json();
      if (!data.id) {
        console.log('User ID is required');
      }
      localStorage.setItem('userid', data.id);
      localStorage.setItem('authenticated', 'true');
      router.push('/');
      console.log('Login successful!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-black">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username_input}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default withAuth(Login);
