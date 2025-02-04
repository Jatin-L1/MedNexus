'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, Brain, Hospital, AlertCircle, ChevronDown, Github, Twitter, Linkedin, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Enhanced parallax transformations
  const logoY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    boxShadow: [
      '0 0 15px rgba(255,255,255,0.1)',
      '0 0 30px rgba(255,255,255,0.2)',
      '0 0 15px rgba(255,255,255,0.1)'
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#030014] text-white">
      {/* Fixed Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover opacity-100"
          style={{ filter: 'brightness(0.8) contrast(1.2)' }}
        >
          <source src="background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div 
            className="relative z-10 text-center"
            style={{ y: logoY, x: mousePosition.x }}
          >
            <motion.h1 
              className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                textShadow: ['0 0 20px rgba(255,255,255,0.3)', '0 0 40px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.3)']
              }}
              transition={{ 
                duration: 0.8,
                textShadow: { duration: 2, repeat: Infinity }
              }}
            >
              MedNexus
            </motion.h1>
            <motion.p 
              className="text-2xl mb-12 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Where Healthcare Meets the Cosmos of Innovation
            </motion.p>
            <motion.button 
              className="px-10 py-5 bg-black/50 backdrop-blur-sm border border-gray-500 rounded-full text-white text-lg font-semibold 
                       relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={pulseAnimation}
              transition={{ duration: 2, repeat: Infinity }}
            > <Link href="/Emergency">
            <span className="relative z-10 cursor-pointer">Send Emergency Signal</span>
          </Link>
            
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 opacity-0 group-hover:opacity-20
                           transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </motion.div>
        </motion.section>

        {/* Info Cards Section */}
        <section className="relative py-20 px-4 backdrop-blur-sm bg-black/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: AlertCircle, title: "24/7 Support", value: "Always Online" },
              { icon: Activity, title: "Response Time", value: "< 3 minutes" },
              { icon: Hospital, title: "Partner Hospitals", value: "2,500+" },
              { icon: Brain, title: "AI Accuracy", value: "99.9%" },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-xl bg-black/40 backdrop-blur-lg
                           border border-gray-700 hover:border-gray-400
                           shadow-[0_0_15px_rgba(255,255,255,0.05)]
                           hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
                           transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <card.icon className="w-12 h-12 text-gray-300 mb-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">{card.title}</h3>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="relative py-20 px-4 backdrop-blur-sm bg-black/40">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Advanced Medical Technologies
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                {
                  title: "AI Disease Prediction",
                  description: "Advanced machine learning algorithms predict potential health issues before they become critical.",
                  icon: Brain,
                  direction: "left"
                },
                {
                  title: "Smart AI Assistance",
                  description: "24/7 AI-powered medical assistance for immediate guidance and support.",
                  icon: Activity,
                  direction: "right"
                },
                {
                  title: "Nearest Hospital Finder",
                  description: "Real-time location tracking to find the closest available medical facilities.",
                  icon: Hospital,
                  direction: "left"
                },
                {
                  title: "Emergency Medical Signal",
                  description: "One-click emergency alert system with instant response coordination.",
                  icon: AlertCircle,
                  direction: "right"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-xl bg-black/40 backdrop-blur-lg
                             border border-gray-800 hover:border-gray-600
                             transition-all duration-300 group"
                  initial={{ 
                    opacity: 0, 
                    x: feature.direction === "left" ? -50 : 50
                  }}
                  whileInView={{ 
                    opacity: 1,
                    x: 0
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-6"
                  >
                    <feature.icon className="w-12 h-12 text-gray-300" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-white
                               transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300
                               transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-black/80 backdrop-blur-lg py-16 px-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 mb-6">
                  MedNexus
                </h3>
                <p className="text-gray-400">
                  Revolutionizing emergency medical response with advanced AI technology.
                </p>
              </motion.div>
              
              {[
                {
                  title: "Quick Links",
                  items: [
                    { name: "About Us", href: "#" },
                    { name: "Services", href: "#" },
                    { name: "Contact", href: "#" }
                  ]
                },
                {
                  title: "Contact",
                  items: [
                    { name: "contact@mednexus.ai" },
                    { name: "+1 (888) MED-NEXUS" }
                  ]
                },
                {
                  title: "Follow Us",
                  social: [
                    { icon: Twitter, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Github, href: "#" }
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-lg font-semibold text-gray-200 mb-6">{section.title}</h4>
                  {section.items && (
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {'href' in item ? (
                            <motion.a
                              href={item.href}
                              className="text-gray-400 hover:text-white transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              {item.name}
                            </motion.a>
                          ) : (
                            <span className="text-gray-400">{item.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.social && (
                    <div className="flex space-x-4">
                      {section.social.map((social, socialIndex) => (
                        <motion.a
                          key={socialIndex}
                          href={social.href}
                          className="text-gray-400 hover:text-white transition-colors duration-300"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="w-6 h-6" />
                        </motion.a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p>&copy; {new Date().getFullYear()} MedNexus. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      </div>
    </main>
  );
}