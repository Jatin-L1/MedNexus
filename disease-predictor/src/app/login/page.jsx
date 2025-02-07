"use client"; // Ensure this component is treated as client-side

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCog, Lock, LogIn } from 'lucide-react';
import Link from 'next/link'; // Import Link from next/link
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation in client components
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3004/api/users/login",credentials);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Save session
      if(response.data.user.role !== "patient") router.push("/dashboard"); // Redirect to patient dashboard
      router.push("/"); // Redirect to dashboard
    } catch (error) {
        console.error("Login Error:", error); // Add this line
        alert(error.response?.data?.error || "Login failed.");
      }finally {
      setLoading(false);
    }
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
            Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required value={credentials.email} onChange={handleChange} 
                  className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                />
                <UserCog className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name='password'
                  required value={credentials.password} onChange={handleChange} 
                  className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="neon-button w-full flex items-center justify-center gap-2 text-lg"
            disabled={loading}
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
