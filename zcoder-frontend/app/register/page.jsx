'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(username, email, password);
      login(user);
      router.push('/dashboard'); // or /room
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2" />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2">Register</button>
      </form>
    </div>
  );
}
