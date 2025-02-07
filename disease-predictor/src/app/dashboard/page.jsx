"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Moon,
  Sun,
  Check,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import EmergencyChat from "@/components/EmergencyChat";

// Custom Icons
const blueIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: "/ca506f6caf2a9dfb39b01910e635c2fd.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
});

const DoctorDashboard = () => {
  // Initialize user state with proper null checking
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responderLocation, setResponderLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [routeCoords, setRouteCoords] = useState([]);
  // Add a loading state for initial user check
  const [isUserLoading, setIsUserLoading] = useState(true);

  // Update user effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsUserLoading(false);
    }
  }, []);

  // Rest of your existing code remains the same until the return statement

  const toggleResponderStatus = async () => {
    try {
      setIsActive(!isActive);
      // Call the backend API to toggle the doctor's active status
      const response = await axios.post(
        "http://localhost:3004/api/toggle-active",
        {
          userId: user.id, // Pass the userId from state
        }
      );

      if (response.data.status !== undefined) {
        // Successfully toggled the status, update the state accordingly
        setIsActive(response.data.status);
      }
    } catch (error) {
      console.error("❌ Error toggling active status:", error);
    }
  };

  /** ✅ Fetch Emergency Requests */
  const fetchEmergencyRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3004/api/emergency/requests");
  
      const hasInProgress = response.data.some((e) => e.status === "inProgress");
  
      const filteredRequests = response.data.filter((emergency) => {
        // 1️⃣ Check if there's an inProgress emergency
        if (hasInProgress) {
          return emergency.status === "inProgress"; // Show only inProgress emergencies
        } 
        
        // 2️⃣ If no inProgress, show pending based on user role
        if (emergency.status === "pending") {
          switch (user.role) {
            case "doctor":
              return emergency.severity === "moderate"; // doctor sees moderate requests
            case "ambulance":
              return emergency.severity === "critical"; // ambulance sees critical requests
            case "nurse":
              return emergency.severity === "normal"; // nurse sees normal requests
            default:
              return true; // Show all if role is undefined
          }
        }
        return false; // Exclude other statuses
      });
  
      setEmergencyRequests(filteredRequests);
      console.log("✅ Fetched emergency requests:", filteredRequests);
    } catch (error) {
      console.error("❌ Failed to fetch emergency requests:", error);
    }
    setLoading(false);
  };
  

  

  /** ✅ Get Doctor's Location */
  const getResponderLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setResponderLocation({ lat: latitude, lng: longitude });
          console.log("✅ Location updated:", latitude, longitude);

          if (socket && socket.readyState === WebSocket.OPEN) {
            console.log("📡 Sending location via WebSocket...");
            socket.send(
              JSON.stringify({
                responderId: user.id,
                lat: latitude,
                lng: longitude,
              })
            );
          }

          // ✅ Ensure emergencyRequests is populated before filtering
          if (emergencyRequests.length > 0) {
            const acceptedEmergencies = emergencyRequests.filter(
              (emergency) => emergency.status === "accepted"
            );

            acceptedEmergencies.forEach((emergency) => {
              axios
                .post("http://localhost:3004/api/emergency/update-location", {
                  responderId: user.id,
                  location: { lat: latitude, lng: longitude },
                  emergencyId: emergency._id,
                })
                .then((response) => {
                  console.log(
                    `✅ Location updated for accepted emergency ${emergency._id}:`,
                    response.data
                  );
                })
                .catch((error) => {
                  console.error(
                    `❌ Error updating location for accepted emergency ${emergency._id}:`,
                    error.response ? error.response.data : error.message
                  );
                });
            });
          }
        },
        (error) => {
          console.error("❌ Geolocation error:", error);
          alert("Error fetching location. Please enable GPS.");
        },
        { enableHighAccuracy: true, timeout: 60000, maximumAge: 0 }
      );
    } else {
      alert("❌ Geolocation is not supported by this browser.");
    }
  };

  const getRoute = async (patientLocation, responderLocation) => {
    if (!patientLocation || !responderLocation) return;

    try {
      const response = await axios.get("http://localhost:3004/api/directions", {
        params: {
          start: `${responderLocation.lng},${responderLocation.lat}`,
          end: `${patientLocation.lng},${patientLocation.lat}`,
        },
      });

      const coordinates = response.data.routes[0].geometry.coordinates.map(
        (coord) => [coord[1], coord[0]]
      );
      setRouteCoords(coordinates);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // Add message fetching function
  const fetchMessages = async (emergencyId) => {
    try {
      const response = await axios.get(`http://localhost:3004/api/messages/${emergencyId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  /** ✅ Accept Emergency */
  const acceptEmergency = async (emergencyId, patientId, patientLocation) => {
    if (!user?.id) {
      alert("You are not logged in as a doctor.");
      return;
    }

    if (!responderLocation) {
      alert("Doctor's location is not available.");
      return;
    }

    try {
      await axios.post("http://localhost:3004/api/emergency/accept", {
        responderId: user.id,
        emergencyId,
        patientId,
        patientLocation,
        responderLocation,
      });

      const emergency = emergencyRequests.find(e => e._id === emergencyId);
      setSelectedEmergency(emergency);
      setIsChatOpen(true); // Open chat when emergency is accepted
      fetchMessages(emergencyId); // Fetch messages for this emergency

      alert("Emergency accepted!");
      fetchEmergencyRequests(); // Re-fetch after accepting
    } catch (error) {
      console.error("❌ Error accepting emergency:", error);
    }
  };
  

  function convertTo12HourFormat(isoString) {
    const date = new Date(isoString);

    // Get hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12

    // Format minutes and seconds
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  /** ✅ Fetch Emergency Requests When Component Mounts */
  useEffect(() => {
    if (
      user?.role === "doctor" ||
      user?.role === "ambulance" ||
      user?.role === "nurse"
    ) {
      fetchEmergencyRequests();
    }
  }, [user]);

  /** ✅ Start Tracking Doctor's Location Only After Emergency Requests Are Fetched */
  useEffect(() => {
    if (emergencyRequests.length > 0) {
      getResponderLocation();
    }
  }, [emergencyRequests]);

  /** ✅ Re-fetch Emergency Requests When Doctor Moves */
  useEffect(() => {
    if (
      emergencyRequests.length > 0 && 
      emergencyRequests[0]?.patientLocation && 
      responderLocation
    ) {
      getRoute(emergencyRequests[0].patientLocation, responderLocation);
    }
  }, [emergencyRequests, responderLocation]);

  /** ✅ WebSocket Connection */
  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:8081");

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        setSocket(ws);
      };

      ws.onmessage = async (event) => {
        console.log("📡 WebSocket Update:", event.data);

        try {
          if (event.data instanceof Blob) {
            const text = await event.data.text(); // Convert Blob to text
            const updatedLocation = JSON.parse(text);
            setResponderLocation(updatedLocation);
          } else {
            const updatedLocation = JSON.parse(event.data); // Parse JSON normally
            setResponderLocation(updatedLocation);
          }
        } catch (error) {
          console.error("❌ Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
      };

      ws.onclose = () => {
        console.log("❌ WebSocket closed. Reconnecting...");
        setTimeout(connectWebSocket, 1000);
      };
    };

    connectWebSocket();

    

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  useEffect(() => {
    if (selectedEmergency && socket) {
      socket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        if (newMessage.emergencyId === selectedEmergency._id) {
          setMessages(prev => [...prev, newMessage]);
        }
      };
    }
  }, [selectedEmergency, socket]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Please log in to access the dashboard</p>
      </div>
    );
  }
 

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
            MedNexus Dashboard
          </h1>

          <div className="flex items-center space-x-6">
            <motion.button
              className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                isActive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-gray-700/20 text-gray-400"
              }`}
              onClick={toggleResponderStatus} // Call the function to toggle status
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span>{isActive ? "Active" : "Sleep Mode"}</span>
            </motion.button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-bold">DR</span>
              </div>
              <span className="font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex h-screen">
        <div className="w-96 bg-black/30 backdrop-blur-md border-r border-gray-800 p-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{user.role} Profile</h2>
            <div className="space-y-2 text-gray-300">
              <p>{user.name}</p>
              <p>{user.specialisation}</p>
              <p>Years of Experience: {user.yearsOfExperience}</p>
              <p>License Number:{user.licenseNo}</p>
              <div className="flex space-x-4 mt-4">
                <div className="bg-gray-800/50 rounded-lg p-3 flex-1 text-center">
                  <p className="text-sm text-gray-400">Today&apos;s Patients</p>
                  <p className="text-xl font-bold">
                    {emergencyRequests.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Patient Requests</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {emergencyRequests.map((emergency) => (
                  <motion.div
                    key={emergency._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">
                        {emergency.patientId?.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          emergency.severity === "moderate"
                            ? "bg-green-500/20 text-green-400"
                            : emergency.severity === "critical"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400" // Assuming normal is blue
                        }`}
                      >
                        {emergency.severity}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {emergency.status}
                      <span className="mx-2">•</span>
                      {convertTo12HourFormat(emergency.createdAt)}
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg flex items-center justify-center space-x-1"
                        onClick={() =>
                          acceptEmergency(
                            emergency._id,
                            emergency.patientId._id,
                            emergency.patientLocation
                          )
                        }
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg flex items-center justify-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

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
                  <Phone className="w-7 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800/50 rounded-lg"
                >
                </motion.button>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg h-[calc(100%-4rem)] flex items-center justify-center">
              <div className="flex-1 p-6 overflow-y-auto">
                <MapContainer
                  key={
                    responderLocation
                      ? `${responderLocation.lat}-${responderLocation.lng}`
                      : "default"
                  }
                  center={[
                    responderLocation?.lat || 0,
                    responderLocation?.lng || 0,
                  ]}
                  zoom={20}
                  style={{ height: "500px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  {/* Markers for each patient's location */}
                  {emergencyRequests.map((emergency) => (
                    <Marker
                      key={emergency._id}
                      position={[
                        emergency.patientLocation.lat,
                        emergency.patientLocation.lng,
                      ]}
                      icon={blueIcon}
                    >
                      <Popup>
                        {emergency.patientId?.name || "Unknown Patient"}
                      </Popup>
                    </Marker>
                  ))}

                  {/* Marker for doctor's location */}
                  {responderLocation && (
                    <Marker
                      position={[responderLocation.lat, responderLocation.lng]}
                      icon={redIcon}
                    >
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                  {routeCoords.length > 0 && (
                    <Polyline positions={routeCoords} color="blue" />
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedEmergency && (
        <EmergencyChat 
          emergencyId={selectedEmergency._id}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;