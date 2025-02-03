'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bell, Moon, Sun, Check, X, Phone, MessageCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const [isActive, setIsActive] = useState(true);
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Smith",
      condition: "Chest Pain",
      urgency: "High",
      location: "2.5 km away",
      time: "2 mins ago"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      condition: "Severe Allergic Reaction",
      urgency: "Critical",
      location: "1.2 km away",
      time: "Just now"
    }
  ]);

  const handleRequestAction = (id, action) => {
    if (action === 'decline') {
      setRequests(requests.filter(req => req.id !== id));
    } else {
      setRequests(requests.map(req => 
        req.id === id ? { ...req, status: 'accepted' } : req
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
            MedNexus Dashboard
          </h1>
          
          <div className="flex items-center space-x-6">
            <motion.button
              className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/20 text-gray-400'
              }`}
              onClick={() => setIsActive(!isActive)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{isActive ? 'Active' : 'Sleep Mode'}</span>
            </motion.button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-bold">DR</span>
              </div>
              <span className="font-medium">Dr. Richard Wilson</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex h-screen">
        {/* Left Section - Doctor Info & Requests */}
        <div className="w-96 bg-black/30 backdrop-blur-md border-r border-gray-800 p-6 overflow-y-auto">
          {/* Doctor Profile */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
            <div className="space-y-2 text-gray-300">
              <p>Dr. Richard Wilson, MD</p>
              <p>Cardiology Specialist</p>
              <p>15 years experience</p>
              <div className="flex space-x-4 mt-4">
                <div className="bg-gray-800/50 rounded-lg p-3 flex-1 text-center">
                  <p className="text-sm text-gray-400">Today&apos;s Patients</p>
                  <p className="text-xl font-bold">12</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 flex-1 text-center">
                  <p className="text-sm text-gray-400">Response Rate</p>
                  <p className="text-xl font-bold">98%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Requests */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Patient Requests</h2>
            <div className="space-y-4">
              <AnimatePresence>
                {requests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{request.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.urgency === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {request.urgency}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{request.condition}</p>
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {request.location}
                      <span className="mx-2">•</span>
                      {request.time}
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg flex items-center justify-center space-x-1"
                        onClick={() => handleRequestAction(request.id, 'accept')}
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg flex items-center justify-center space-x-1"
                        onClick={() => handleRequestAction(request.id, 'decline')}
                      >
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="flex-1 bg-gray-900 p-6">
          <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg h-full p-4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Live Location Tracking</h2>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800/50 rounded-lg"
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800/50 rounded-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg h-[calc(100%-4rem)] flex items-center justify-center">
              <p className="text-gray-400">Map Interface Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;