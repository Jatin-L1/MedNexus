"use client"; // Ensure this component is treated as client-side
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCog, Lock, LogIn } from 'lucide-react';
import Link from 'next/link'; // Import Link from next/link
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation in client components

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Correct usage of useRouter

  const handleSubmit = (e) => {
    e.preventDefault();
    // This will be connected to the backend later
    console.log('Login submitted:', { email, password });
    router.push('/dashboard'); // Navigate to dashboard after successful login
  };

  return (
    <div className="pt-24 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
      >
        <div className="flex items-center gap-4 mb-8">
          <UserCog className="h-8 w-8 text-cyan-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Professional Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                  required
                />
                <UserCog className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="neon-button w-full flex items-center justify-center gap-2 text-lg"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-navy-800/50 text-gray-400">or</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Register as a Medical Professional
            </Link>
          </div>
        </form>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/4 -left-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default Login;
