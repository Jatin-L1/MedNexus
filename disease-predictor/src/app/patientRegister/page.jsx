"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PatientRegisterForm() {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
      });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
     ...credentials,
    role: "patient",
    specialisation: "",
    licenseNo: "",
    yearsOfExperience: "",
    coverImage: "",
    };

    try {
        await axios.post("http://localhost:3004/api/users/register", payload);
        alert("Account created successfully.");
        router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Signup failed.");
      } finally {
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
          <UserPlus className="h-8 w-8 text-cyan-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Patient Registration
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            

            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                  placeholder="Choose a unique username"
                  required
                />
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name='password'
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                  placeholder="Create a strong password"
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
            <UserPlus className="h-5 w-5" />
            Register
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
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Already have an account? Sign In
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
}