"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileText, 
  Check, 
  X, 
  Search, 
  Filter, 
  RefreshCw,
  Rocket,
  FileText as PdfFile
} from 'lucide-react';

// Mock data with PDF support
const mockProfessionals = [
  {
    id: 1,
    fullName: 'Dr. Elena Cosmos',
    email: 'elena.cosmos@medical.com',
    title: 'Doctor',
    specialization: 'Space Medicine',
    licenseNumber: 'MD-SPACE-12345',
    experience: 7,
    status: 'pending',
    credentials: [
      { name: 'Medical_License.pdf', url: '#' },
      { name: 'Space_Training_Cert.pdf', url: '#' }
    ]
  }
];

const AdminDashboard = () => {
  const [professionals, setProfessionals] = useState(mockProfessionals);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const handleVerification = (id, approved) => {
    setProfessionals(professionals.map(prof => 
      prof.id === id 
        ? { ...prof, status: approved ? 'approved' : 'rejected' }
        : prof
    ));
  };

  const viewPDF = (url) => {
    window.open(url, '_blank');
  };

  const filteredProfessionals = professionals.filter(prof => 
    prof.status === filter &&
    prof.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('/space-background.svg')] opacity-20 pointer-events-none" />

        <div className="relative p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Rocket className="h-10 w-10 text-cyan-400 animate-pulse" />
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                Cosmic Professional Verification
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search cosmic professionals" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-10 p-2 text-gray-300"
                />
              </div>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-300"
              >
                <option value="pending">Pending Verification</option>
                <option value="approved">Approved Professionals</option>
                <option value="rejected">Rejected Applications</option>
              </select>
            </div>
          </div>

          {filteredProfessionals.map((professional) => (
            <motion.div
              key={professional.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-cyan-300">
                        {professional.fullName}
                      </h2>
                      <p className="text-gray-400 mb-4">{professional.specialization}</p>
                    </div>
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                      {professional.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-gray-300 mb-4">
                    <div>🔖 License: {professional.licenseNumber}</div>
                    <div>🚀 Experience: {professional.experience} years</div>
                    <div>📧 {professional.email}</div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-cyan-400" /> 
                      Credentials
                    </h3>
                    <div className="flex space-x-4">
                      {professional.credentials.map((file, index) => (
                        <button 
                          key={index}
                          onClick={() => viewPDF(file.url)}
                          className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg transition-colors"
                        >
                          <PdfFile className="h-5 w-5 mr-2 text-red-400" />
                          {file.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {professional.status === 'pending' && (
                    <div className="mt-4 flex space-x-4">
                      <button 
                        onClick={() => handleVerification(professional.id, true)}
                        className="flex items-center bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30"
                      >
                        <Check className="mr-2" /> Approve Professional
                      </button>
                      <button 
                        onClick={() => handleVerification(professional.id, false)}
                        className="flex items-center bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30"
                      >
                        <X className="mr-2" /> Reject Application
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredProfessionals.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              <RefreshCw className="mx-auto h-12 w-12 text-cyan-400 mb-4 animate-spin" />
              No cosmic professionals found in this cosmic category.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;