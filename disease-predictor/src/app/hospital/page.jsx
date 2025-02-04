"use client"
import { motion } from "framer-motion"
import { Hospital, MapPin } from "lucide-react"

const HospitalFinder = () => {
  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
      >
        <div className="flex items-center gap-4 mb-8">
          <Hospital className="h-8 w-8 text-cyan-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Find Nearest Hospitals
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Your Location</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="flex-1 bg-navy-900/50 border border-gray-700 rounded-lg p-3 text-gray-300"
                />
                <button className="neon-button px-6">
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Placeholder for hospital list */}
              <div className="p-4 bg-navy-900/50 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-cyan-400">City Hospital</h3>
                <p className="text-gray-300 mt-2">123 Medical Street</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-400">Open 24/7</span>
                  <button className="neon-button text-sm">Get Directions</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy-900/50 rounded-lg min-h-[400px] flex items-center justify-center">
            <p className="text-gray-400">Map will be integrated here</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HospitalFinder

