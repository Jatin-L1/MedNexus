
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bell, Moon, Sun, Phone, MessageCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';


// Component to handle map position updates
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

const DoctorDashboard = () => {
 
  const [hospitals, setHospitals] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "ca277f684e914ee8b72058fbc5134660";

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  };

  const fetchNearbyHospitals = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get current location
      const location = await getCurrentLocation();
      setMapCenter([location.lat, location.lon]);

      // Fetch hospitals within 10km radius
      const placesResponse = await axios.get(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${location.lon},${location.lat},10000&apiKey=${API_KEY}`
      );

      if (!placesResponse.data.features) {
        throw new Error("No hospitals found in your area");
      }


      // Filter unique hospitals and add distance calculation
      const uniqueHospitals = placesResponse.data.features.filter(
        (hospital, index, self) =>
          index === self.findIndex(
            (h) =>
              h.properties.name === hospital.properties.name &&
              h.properties.address_line2 === hospital.properties.address_line2
          )
      ).map(hospital => {
        // Calculate distance from current location
        const distance = calculateDistance(
          location.lat,
          location.lon,
          hospital.properties.lat,
          hospital.properties.lon
        );
        return { ...hospital, distance };
      }).sort((a, b) => a.distance - b.distance); // Sort by distance

      setHospitals(uniqueHospitals);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching hospitals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1); // Return distance in km with 1 decimal place
  };

  useEffect(() => {
    fetchNearbyHospitals();
  }, []); // Fetch hospitals on component mount

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 z-50">
      </nav>

      <div className="pt-16 flex h-screen">
        {/* Left Section - Hospital List */}
        <div className="w-96 bg-black/30 backdrop-blur-md border-r border-gray-800 p-6 mt-1 overflow-y-auto">
          {/* Refresh Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchNearbyHospitals}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg mb-6 font-semibold text-lg shadow-lg disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Refresh Nearby Hospitals'}
          </motion.button>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg">
              {error}
            </div>
          )}

          {/* Hospital List */}
          <AnimatePresence>
            {hospitals.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Nearby Hospitals</h2>
                {hospitals.map((hospital, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{hospital.properties.name}</h3>
                      <span className="text-sm text-blue-400">{hospital.distance}km away</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hospital.properties.address_line2 || hospital.properties.city}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-3 bg-blue-500/20 text-blue-400 py-2 rounded-lg flex items-center justify-center space-x-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{hospital.properties.contact?.phone || 'NA'}</span>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section - Map */}
        <div className="flex-1 bg-gray-900 p-4">
          <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg h-full">
            <div className="mb-4 p-4">
              <h2 className="text-2xl font-bold">Live Location Tracking</h2>
            </div>
            <div className="h-[calc(100%-5rem)]">
              {mapCenter[0] !== 0 && (
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* Current Location Marker */}
                  <Marker
  position={mapCenter}
  icon={L.divIcon({
    className: 'current-location-marker',
    html: `
      <div style="position: relative;">
        <div class="radar-wave"></div>
        <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white relative z-10"></div>
      </div>
    `,
  })}
>
  <Popup>Your Location</Popup>
</Marker>

                  {/* Hospital Markers */}
                  {hospitals.map((hospital, index) => (
                    <Marker
                      key={index}
                      position={[
                        hospital.properties.lat,
                        hospital.properties.lon
                      ]}
                      icon={L.divIcon({
                        className: 'current-location-marker',
                        html: `
                          <div style="position: relative;">
                            <div class="radar-wave2"></div>
                            <div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white relative z-10"></div>
                          </div>
                        `,
                      })}
                    >
                      <Popup>
                        <div className="text-gray-900">
                          <h3 className="font-semibold">{hospital.properties.name}</h3>
                          <p className="text-sm">{hospital.properties.address_line2 || hospital.properties.city}</p>
                          <p className="text-sm text-blue-600">{hospital.distance}km away</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  <MapUpdater center={mapCenter} />
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

