"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCog, Upload, Shield, Mail, Lock, BadgeCheck, FileText } from 'lucide-react';
import Link from 'next/link'; // Use Next.js Link instead of react-router-dom Link
import axios from 'axios';
import {useRouter} from 'next/navigation';

const Registration = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    specialisation: "", // Keep this even if not shown
    licenseNo: "",
    yearsOfExperience: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...credentials
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
    <div className="pt-24 px-4 max-w-4xl mx-auto mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 relative overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <UserCog className="h-8 w-8 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Professional Registration
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                <UserCog className="h-5 w-5 text-cyan-400" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 text-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                    <input
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-cyan-400" />
                Professional Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Professional Title</label>
                  <select
                    name="role"
                    value={credentials.role}
                    onChange={handleChange}
                    className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 text-gray-300"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="ambulance">Ambulance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">License Number</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                    <input
                      type="text"
                      name="licenseNo"
                      value={credentials.licenseNo}
                      onChange={handleChange}
                      className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 pl-10 text-gray-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Specialization</label>
                  <input
                    type="text"
                    name="specialisation"
                    value={credentials.specialisation}
                    onChange={handleChange}
                    className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 text-gray-300"
                    placeholder="e.g., Cardiology, Emergency Medicine"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={credentials.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full bg-navy-900/50 border border-gray-700 rounded-lg p-3 text-gray-300"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Credentials Upload */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-400" />
                Credentials Verification
              </h2>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-navy-900/30">
                <Upload className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">Upload your medical credentials</p>
                <p className="text-sm text-gray-400">Drag and drop your files here, or click to select files</p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                />
                <button type="button" className="mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                  Select Files
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-300 bg-navy-900/30 p-4 rounded-lg">
              <Shield className="h-5 w-5 text-cyan-400 flex-shrink-0" />
              <p className="text-sm">Your credentials will be securely verified using blockchain technology. This process ensures the highest level of security and authenticity for medical professionals.</p>
            </div>

            <div className="flex flex-col gap-4">
              <button type="submit" className="neon-button w-full text-lg">
                Submit for Verification
              </button>
              <p className="text-center text-gray-400">
                Already registered?{' '}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
