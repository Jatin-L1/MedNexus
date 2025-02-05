'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bed, 
  Clock, 
  AlertCircle, 
  PencilLine, 
  Save, 
  Building2, 
  Activity
} from 'lucide-react';

const HospitalDashboard = () => {
  const [editMode, setEditMode] = useState(null);
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "Central City Hospital",
    status: "Open",
    totalBeds: 200,
    availableBeds: 45,
    erWaitTime: "25",
    emergencyStatus: "High Volume",
    departments: [
      {
        id: 1,
        name: "Emergency Room",
        status: "Very Busy",
        availableBeds: 5,
        totalBeds: 30,
        waitTime: "35"
      },
      {
        id: 2,
        name: "ICU",
        status: "Moderate",
        availableBeds: 8,
        totalBeds: 20,
        waitTime: "N/A"
      },
      {
        id: 3,
        name: "General Ward",
        status: "Available",
        availableBeds: 32,
        totalBeds: 150,
        waitTime: "15"
      }
    ]
  });

  const handleDepartmentUpdate = (id, field, value) => {
    setHospitalInfo(prev => ({
      ...prev,
      departments: prev.departments.map(dept =>
        dept.id === id ? { ...dept, [field]: value } : dept
      )
    }));
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Very Busy': 'red',
      'Moderate': 'yellow',
      'Available': 'green',
    };
    return statusColors[status] || 'gray';
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 rounded-full text-sm bg-${getStatusColor(status)}-500/20 text-${getStatusColor(status)}-400`}>
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Building2 className="w-8 h-8 text-blue-400" />
        </div>
      </nav>

      <div className="pt-20 px-6">
        {/* Hospital Name Header */}
        <div className="mb-8 text-right">
          <h1 className="text-3xl font-bold text-white">{hospitalInfo.name}</h1>
          <p className="text-gray-400">Healthcare Management Dashboard</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400">Total Beds</h3>
              <Bed className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold">{hospitalInfo.totalBeds}</p>
            <p className="text-sm text-green-400">{hospitalInfo.availableBeds} Available</p>
          </motion.div>

          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400">ER Wait Time</h3>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold">{hospitalInfo.erWaitTime} mins</p>
            <p className="text-sm text-yellow-400">Average</p>
          </motion.div>

          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400">Emergency Status</h3>
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold">{hospitalInfo.emergencyStatus}</p>
            <p className="text-sm text-red-400">Current Level</p>
          </motion.div>

          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400">Activity Level</h3>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold">High</p>
            <p className="text-sm text-blue-400">Current</p>
          </motion.div>
        </div>

        {/* Department Status */}
        <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Department Status</h2>
          <div className="space-y-4">
            {hospitalInfo.departments.map((dept) => (
              <motion.div
                key={dept.id}
                className="bg-gray-800/50 rounded-lg p-4"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{dept.name}</h3>
                    <StatusBadge status={dept.status} />
                  </div>
                  {editMode === dept.id ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode(null)}
                      className="p-2 bg-green-500/20 text-green-400 rounded-lg"
                    >
                      <Save className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode(dept.id)}
                      className="p-2 bg-gray-700/50 text-gray-400 rounded-lg"
                    >
                      <PencilLine className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-sm text-gray-400 mb-1">Available Beds</p>
                    {editMode === dept.id ? (
                      <input
                        type="number"
                        value={dept.availableBeds}
                        onChange={(e) => handleDepartmentUpdate(dept.id, 'availableBeds', e.target.value)}
                        className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                      />
                    ) : (
                      <p className="font-bold">{dept.availableBeds} / {dept.totalBeds}</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-sm text-gray-400 mb-1">Wait Time</p>
                    {editMode === dept.id ? (
                      <input
                        type="text"
                        value={dept.waitTime}
                        onChange={(e) => handleDepartmentUpdate(dept.id, 'waitTime', e.target.value)}
                        className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                      />
                    ) : (
                      <p className="font-bold">{dept.waitTime} mins</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-sm text-gray-400 mb-1">Status</p>
                    {editMode === dept.id ? (
                      <select
                        value={dept.status}
                        onChange={(e) => handleDepartmentUpdate(dept.id, 'status', e.target.value)}
                        className="w-full bg-gray-800 rounded px-2 py-1 text-white"
                      >
                        <option>Very Busy</option>
                        <option>Moderate</option>
                        <option>Available</option>
                      </select>
                    ) : (
                      <StatusBadge status={dept.status} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;