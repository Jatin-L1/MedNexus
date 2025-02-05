'use client';

import { motion } from 'framer-motion';
import { Brain, Activity, Hospital, AlertCircle, KeyRound, ChevronDown, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [navBackground, setNavBackground] = useState('transparent');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(window.scrollY > 50 ? 'rgba(0, 0, 0, 0.8)' : 'transparent');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('session'); // Replace 'session' with your session key in localStorage
    setDropdownOpen(false); // Close the dropdown
    router.push('/login'); // Redirect to the login page
  };

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className="fixed w-full z-50 backdrop-blur-sm border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            animate={{ 
              textShadow: ['0 0 10px rgba(255,255,255,0.2)', '0 0 20px rgba(255,255,255,0.4)', '0 0 10px rgba(255,255,255,0.2)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Link href="/">MedNexus</Link>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {[ 
              { name: 'Disease Prediction', icon: Brain, href: '/predict' },
              { name: 'AI Assistance', icon: Activity, href: '/ai' },
              { name: 'Find a Hospital', icon: Hospital, href: '/hospital' },
              { name: 'Login', icon: KeyRound, href: '/login' }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-white group relative"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span className="relative">
                  {item.name}
                  <motion.span 
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-gray-500 via-white to-gray-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.a>
            ))}

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Sign Up</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Register as Professional
                  </Link>
                  <Link
                    href="/patientRegister"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Register as Patient
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={handleSignOut}
                  >
                    <LogOut className="inline w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
