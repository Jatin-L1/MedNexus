// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import {
// //   MapPin,
// //   AlertTriangle,
// //   Ambulance,
// //   CheckCircle2,
// //   MessageCircle,
// //   ShieldCheck,
// //   UserCircle,
// //   Clock,
// // } from "lucide-react";
// // import EmergencyChat from "../../components/EmergencyChat";
// // import axios from "axios";
// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import { Polyline } from "react-leaflet";
// // import L from "leaflet";
// // import "leaflet/dist/leaflet.css";

// // const patientIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/235/235861.png",
// //   iconSize: [40, 40],
// // });

// // const doctorIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
// //   iconSize: [35, 35],
// // });

// // const PatientEmergencyDashboard = () => {
// //   const [isEmergencyTriggered, setIsEmergencyTriggered] = useState(false);
// //   const [isDoctorArrived, setIsDoctorArrived] = useState(false);
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [acceptedEmergencies, setAcceptedEmergencies] = useState([]);
// //   const [routeCoords, setRouteCoords] = useState([]);
// //   const [emergencySeverity, setEmergencySeverity] = useState(""); // New state for emergency severity
// //   const [severitySelected, setSeveritySelected] = useState(false); // Flag to track if severity has been selected

// //   useEffect(() => {
// //     // Fetch user from localStorage
// //     const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
// //     setUser(userFromLocalStorage);
// //   }, []);

// //   useEffect(() => {
// //     // Fetch accepted emergencies from the API
// //     const fetchAcceptedEmergencies = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:3004/api/emergency/accepted"
// //         );
// //         setAcceptedEmergencies(response.data);
// //         console.log("Accepted emergencies:", response.data);
// //       } catch (error) {
// //         console.error("Error fetching accepted emergencies:", error);
// //         alert("Failed to fetch accepted emergencies.");
// //       }
// //     };

// //     if (user?.role === "patient") {
// //       fetchAcceptedEmergencies();
// //     }
// //   }, [user]);

// //   const triggerEmergency = async () => {
// //     if (!user || !user.id) {
// //       alert("Patient is not logged in.");
// //       return;
// //     }

// //     setLoading(true);

// //     if (!navigator.geolocation) {
// //       alert("Geolocation is not supported by your browser.");
// //       setLoading(false);
// //       return;
// //     }

// //     // If severity is not selected, prompt the user to select it
// //     if (!emergencySeverity) {
// //       alert("Please select the severity of the emergency.");
// //       setLoading(false);
// //       return;
// //     }

// //     navigator.geolocation.getCurrentPosition(
// //       async (position) => {
// //         const location = {
// //           lat: position.coords.latitude,
// //           lng: position.coords.longitude,
// //         };

// //         try {
// //           // Send emergency data with severity to the backend
// //           await axios.post("http://localhost:3004/api/emergency/trigger", {
// //             patientId: user.id,
// //             location,
// //             severity: emergencySeverity, // Include severity
// //           });

// //           alert("Emergency triggered! Searching for nearby doctors...");
// //           setSeveritySelected(true); // Mark severity as selected
// //           setIsEmergencyTriggered(true); // Mark emergency as triggered
// //         } catch (error) {
// //           console.error(
// //             "Error triggering emergency:",
// //             error.response ? error.response.data : error.message
// //           );
// //           alert("Failed to trigger emergency.");
// //         } finally {
// //           setLoading(false);
// //         }
// //       },
// //       (error) => {
// //         console.error("Error getting patient location:", error.message);
// //         alert("Error getting patient location: " + error.message);
// //       },
// //       { enableHighAccuracy: true, maximumAge: 0, timeout: 60000 }
// //     );
// //   };

// //   const handleSeverityChange = (e) => {
// //     setEmergencySeverity(e.target.value); // Update severity state
// //   };

// //   // Ensure there is at least one accepted emergency before rendering the map
// //   const firstEmergency =
// //     acceptedEmergencies.length > 0 ? acceptedEmergencies[0] : null;

// //   const getRoute = async (patientLocation, responderLocation) => {
// //     try {
// //       const response = await axios.get("http://localhost:3004/api/directions", {
// //         params: {
// //           start: `${responderLocation.lng},${responderLocation.lat}`,
// //           end: `${patientLocation.lng},${patientLocation.lat}`,
// //         },
// //       });

// //       const coordinates = response.data.routes[0].geometry.coordinates.map(
// //         (coord) => [coord[1], coord[0]]
// //       );
// //       setRouteCoords(coordinates);
// //     } catch (error) {
// //       console.error("Error fetching route:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (acceptedEmergencies.length > 0) {
// //       const firstEmergency = acceptedEmergencies[0];
// //       if (firstEmergency.patientLocation && firstEmergency.responderLocation) {
// //         getRoute(
// //           firstEmergency.patientLocation,
// //           firstEmergency.responderLocation
// //         );
// //       }
// //     }
// //   }, [acceptedEmergencies]);

// //   // Function to calculate distance using the Haversine formula
// //   function calculateDistance(lat1, lon1, lat2, lon2) {
// //     const R = 6371; // Earth's radius in km
// //     const dLat = (lat2 - lat1) * (Math.PI / 180);
// //     const dLon = (lon2 - lon1) * (Math.PI / 180);

// //     const a =
// //       Math.sin(dLat / 2) ** 2 +
// //       Math.cos(lat1 * (Math.PI / 180)) *
// //         Math.cos(lat2 * (Math.PI / 180)) *
// //         Math.sin(dLon / 2) ** 2;

// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //     const distance = R * c; // Distance in km

// //     return distance;
// //   }

// //   // Function to calculate time based on distance
// //   function calculateEstimatedTime(
// //     patientLocation,
// //     responderLocation,
// //     speed = 60
// //   ) {
// //     // Speed in km/h
// //     if (!patientLocation || !responderLocation) return "Location data missing";
// //     console.log(patientLocation, responderLocation);
// //     const distance = calculateDistance(
// //       patientLocation.lat,
// //       patientLocation.lng,
// //       responderLocation.lat,
// //       responderLocation.lng
// //     );

// //     const timeInHours = distance / speed;
// //     const timeInMinutes = Math.round(timeInHours * 60); // Convert to minutes

// //     return `${timeInMinutes} mins`;
// //   }

// //   // Severity color mapping
// //   const severityColors = {
// //     normal: {
// //       default: "bg-green-800/50 text-green-400",
// //       active: "bg-green-500 text-white",
// //     },
// //     moderate: {
// //       default: "bg-yellow-800/50 text-yellow-400",
// //       active: "bg-yellow-500 text-white",
// //     },
// //     critical: {
// //       default: "bg-red-800/50 text-red-400",
// //       active: "bg-red-500 text-white",
// //     },
// //   };



  
// //   const handleDoctorArrival = async (emergencyId) => { // Pass the emergency ID
// //     try {
// //       console.log(emergencyId);
// //       await axios.post("http://localhost:3004/api/emergency/doctor-arrival", {
// //         emergencyId: emergencyId,
// //         status: "resolved",
// //       });

// //      setIsDoctorArrived(true);
// //       alert("Doctor arrival confirmed. Status updated to resolved.");

// //     } catch (error) {
// //       console.error("Error updating doctor arrival status:", error);
// //       alert("Failed to confirm doctor arrival.");
// //     }
// //   };
  
// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white flex flex-col">
// //       {/* Navbar */}
// //       <div className="w-full bg-black/30 backdrop-blur-md border-b border-gray-800 p-4 text-center text-lg font-bold"></div>

// //       <div className="flex flex-1 overflow-hidden mt-[1vh]">
// //         {/* Sidebar */}
// //         <div className="w-96 bg-black/30 backdrop-blur-md border-r border-gray-800 p-6 overflow-y-auto mt-7">
// //           {/* Emergency Severity Section */}
// //           <div className="mb-6">
// //             <h2 className="text-2xl font-bold mb-4">Emergency Severity</h2>
// //             <div className="space-y-3">
// //               {["normal", "moderate", "critical"].map((level) => (
// //                 <motion.button
// //                   key={level}
// //                   className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
// //                     emergencySeverity === level
// //                       ? severityColors[level].active
// //                       : severityColors[level].default
// //                   }`}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   onClick={() => setEmergencySeverity(level)}
// //                 >
// //                   <AlertTriangle className="w-5 h-5" />
// //                   <span>{level}</span>
// //                 </motion.button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Responding Doctor Section */}
// //           <div>
// //             <h2 className="text-2xl font-bold mb-4 flex items-center">
// //               <ShieldCheck className="w-6 h-6 mr-2 text-green-400" />
// //               Responding Doctor
// //             </h2>
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
// //             >
// //               {acceptedEmergencies.map((emergency) => (
// //                 <div key={emergency._id}>
// //                   {" "}
// //                   {/* Wrap everything in a div with the key */}
// //                   <div className="flex justify-between items-center mb-2">
// //                     <div className="flex items-center space-x-2">
// //                       <UserCircle className="w-10 h-10 text-gray-400" />
// //                       <div>
// //                         <h3 className="font-semibold text-lg">
// //                           {emergency.responderId?.name ||
// //                             "Responder Not Assigned"}
// //                         </h3>
// //                         <p className="text-sm text-gray-400">
// //                           {emergency.responderId?.role || "N/A"}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <span className="text-sm text-yellow-400">★</span>
// //                   </div>
// //                   <div className="space-y-2 text-sm text-gray-300 mt-3">
// //                     <div className="flex items-center space-x-2">
// //                       <MapPin className="w-4 h-4" />
// //                       <span>
// //                         {" "}
// //                         {calculateDistance(
// //                           emergency.patientLocation.lat,
// //                           emergency.patientLocation.lng,
// //                           emergency.responderLocation.lat,
// //                           emergency.responderLocation.lng
// //                         )}
// //                         km away
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center space-x-2">
// //                       <Clock className="w-4 h-4" />
// //                       <span>
// //                         Estimated Arrival:{" "}
// //                         {calculateEstimatedTime(
// //                           emergency.patientLocation,
// //                           emergency.responderLocation
// //                         )}
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center space-x-2">
// //                       <ShieldCheck className="w-4 h-4" />
// //                       <span>
// //                         LicenseNumber :{" "}
// //                         {emergency.responderId?.licenseNo || "N/A"}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </motion.div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="flex-1 bg-gray-900 p-3 relative overflow-auto">
// //           <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg h-full p-4 flex flex-col relative mt-4">
// //             <div className="mb-4 flex justify-between items-center">
// //               <h2 className="text-2xl font-bold">Emergency Location</h2>
// //               <button
// //                 onClick={() => setIsChatOpen(!isChatOpen)}
// //                 className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full text-white flex items-center shadow-lg"
// //               >
// //                 <MessageCircle className="w-6 h-6" />
// //               </button>
// //             </div>

// //             <div className="bg-gray-800/50 rounded-lg h-[calc(100%-4rem)] flex items-center justify-center">
// //               <div className="flex-1 p-6 overflow-y-auto">
// //                 {firstEmergency && firstEmergency.patientLocation && (
// //                   <MapContainer
// //                     center={[
// //                       firstEmergency.patientLocation.lat,
// //                       firstEmergency.patientLocation.lng,
// //                     ]}
// //                     zoom={20}
// //                     style={{ height: "500px", width: "100%" }}
// //                   >
// //                     <TileLayer
// //                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //                     />

// //                     {/* Patient's Marker */}
// //                     <Marker
// //                       position={[
// //                         firstEmergency.patientLocation.lat,
// //                         firstEmergency.patientLocation.lng,
// //                       ]}
// //                       icon={patientIcon}
// //                     >
// //                       <Popup>Your Location</Popup>
// //                     </Marker>

// //                     {/* Doctor's Live Location Marker */}
// //                     {firstEmergency.responderLocation && (
// //                       <Marker
// //                         position={[
// //                           firstEmergency.responderLocation.lat,
// //                           firstEmergency.responderLocation.lng,
// //                         ]}
// //                         icon={doctorIcon}
// //                       >
// //                         <Popup>Doctor is on the way!</Popup>
// //                       </Marker>
// //                     )}
// //                     {routeCoords.length > 0 && (
// //                       <Polyline positions={routeCoords} color="blue" />
// //                     )}
// //                   </MapContainer>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex space-x-4 mt-auto">
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="flex-1 py-4 rounded-lg text-lg font-bold bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-700 flex justify-center items-center space-x-2"
// //                 onClick={triggerEmergency}
// //                 disabled={!emergencySeverity || isEmergencyTriggered}
// //               >
// //                 <Ambulance className="w-6 h-6" />
// //                 <span>
// //                   {isEmergencyTriggered
// //                     ? "Emergency Triggered"
// //                     : "Trigger Emergency"}
// //                 </span>
// //               </motion.button>

// //               {acceptedEmergencies.map((emergency) => (

// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="flex-1 py-4 rounded-lg text-lg font-bold bg-green-500 text-white hover:bg-green-600 flex justify-center items-center space-x-2"
// //                 onClick={()=>handleDoctorArrival(emergency._id)}
               
// //               >
// //                 <CheckCircle2 className="w-6 h-6" />
// //                 <span>
// //                   {isDoctorArrived
// //                     ? "Doctor Arrived"
// //                     : "Confirm Doctor Arrival"}
// //                 </span>
// //               </motion.button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* Add EmergencyChat component here */}
// //       {isChatOpen && acceptedEmergencies.length > 0 && (
// //         <EmergencyChat
// //           emergencyId={acceptedEmergencies[0]._id}
// //           userId={user.id}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default PatientEmergencyDashboard;

// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   AlertTriangle,
//   Ambulance,
//   CheckCircle2,
//   MessageCircle,
//   ShieldCheck,
//   UserCircle,
//   Clock,
// } from "lucide-react";
// import EmergencyChat from "../../components/EmergencyChat";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Polyline } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const patientIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/235/235861.png",
//   iconSize: [40, 40],
// });

// const doctorIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
//   iconSize: [35, 35],
// });

// const PatientEmergencyDashboard = () => {
//   const [isEmergencyTriggered, setIsEmergencyTriggered] = useState(false);
//   const [isDoctorArrived, setIsDoctorArrived] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [acceptedEmergencies, setAcceptedEmergencies] = useState([]);
//   const [routeCoords, setRouteCoords] = useState([]);
//   const [emergencySeverity, setEmergencySeverity] = useState(""); // New state for emergency severity
//   const [severitySelected, setSeveritySelected] = useState(false); // Flag to track if severity has been selected

//   useEffect(() => {
//     // Fetch user from localStorage
//     if (typeof window !== "undefined") {
//       const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
//       setUser(userFromLocalStorage);
//     }
//   }, []);

//   useEffect(() => {
//     // Fetch accepted emergencies from the API
//     const fetchAcceptedEmergencies = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3004/api/emergency/accepted"
//         );
//         setAcceptedEmergencies(response.data);
//         console.log("Accepted emergencies:", response.data);
//       } catch (error) {
//         console.error("Error fetching accepted emergencies:", error);
//         alert("Failed to fetch accepted emergencies.");
//       }
//     };

//     if (user?.role === "patient") {
//       fetchAcceptedEmergencies();
//     }
//   }, [user]);

//   const triggerEmergency = async () => {
//     if (!user || !user.id) {
//       alert("Patient is not logged in.");
//       return;
//     }

//     setLoading(true);

//     if (typeof navigator === "undefined" || !navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       setLoading(false);
//       return;
//     }

//     // If severity is not selected, prompt the user to select it
//     if (!emergencySeverity) {
//       alert("Please select the severity of the emergency.");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const location = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         try {
//           // Send emergency data with severity to the backend
//           await axios.post("http://localhost:3004/api/emergency/trigger", {
//             patientId: user.id,
//             location,
//             severity: emergencySeverity, // Include severity
//           });

//           alert("Emergency triggered! Searching for nearby doctors...");
//           setSeveritySelected(true); // Mark severity as selected
//           setIsEmergencyTriggered(true); // Mark emergency as triggered
//         } catch (error) {
//           console.error(
//             "Error triggering emergency:",
//             error.response ? error.response.data : error.message
//           );
//           alert("Failed to trigger emergency.");
//         } finally {
//           setLoading(false);
//         }
//       },
//       (error) => {
//         console.error("Error getting patient location:", error.message);
//         alert("Error getting patient location: " + error.message);
//       },
//       { enableHighAccuracy: true, maximumAge: 0, timeout: 60000 }
//     );
//   };

//   const handleSeverityChange = (e) => {
//     setEmergencySeverity(e.target.value); // Update severity state
//   };

//   // Ensure there is at least one accepted emergency before rendering the map
//   const firstEmergency =
//     acceptedEmergencies.length > 0 ? acceptedEmergencies[0] : null;

//   const getRoute = async (patientLocation, responderLocation) => {
//     try {
//       const response = await axios.get("http://localhost:3004/api/directions", {
//         params: {
//           start: `${responderLocation.lng},${responderLocation.lat}`,
//           end: `${patientLocation.lng},${patientLocation.lat}`,
//         },
//       });

//       const coordinates = response.data.routes[0].geometry.coordinates.map(
//         (coord) => [coord[1], coord[0]]
//       );
//       setRouteCoords(coordinates);
//     } catch (error) {
//       console.error("Error fetching route:", error);
//     }
//   };

//   useEffect(() => {
//     if (acceptedEmergencies.length > 0) {
//       const firstEmergency = acceptedEmergencies[0];
//       if (firstEmergency.patientLocation && firstEmergency.responderLocation) {
//         getRoute(
//           firstEmergency.patientLocation,
//           firstEmergency.responderLocation
//         );
//       }
//     }
//   }, [acceptedEmergencies]);

//   // Function to calculate distance using the Haversine formula
//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Earth's radius in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);

//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(lat1 * (Math.PI / 180)) *
//         Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) ** 2;

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in km

//     return distance;
//   }

//   // Function to calculate time based on distance
//   function calculateEstimatedTime(
//     patientLocation,
//     responderLocation,
//     speed = 60
//   ) {
//     // Speed in km/h
//     if (!patientLocation || !responderLocation) return "Location data missing";
//     console.log(patientLocation, responderLocation);
//     const distance = calculateDistance(
//       patientLocation.lat,
//       patientLocation.lng,
//       responderLocation.lat,
//       responderLocation.lng
//     );

//     const timeInHours = distance / speed;
//     const timeInMinutes = Math.round(timeInHours * 60); // Convert to minutes

//     return `${timeInMinutes} mins`;
//   }

//   // Severity color mapping
//   const severityColors = {
//     normal: {
//       default: "bg-green-800/50 text-green-400",
//       active: "bg-green-500 text-white",
//     },
//     moderate: {
//       default: "bg-yellow-800/50 text-yellow-400",
//       active: "bg-yellow-500 text-white",
//     },
//     critical: {
//       default: "bg-red-800/50 text-red-400",
//       active: "bg-red-500 text-white",
//     },
//   };

//   const handleDoctorArrival = async (emergencyId) => {
//     // Pass the emergency ID
//     try {
//       console.log(emergencyId);
//       await axios.post("http://localhost:3004/api/emergency/doctor-arrival", {
//         emergencyId: emergencyId,
//         status: "resolved",
//       });

//       setIsDoctorArrived(true);
//       alert("Doctor arrival confirmed. Status updated to resolved.");
//     } catch (error) {
//       console.error("Error updating doctor arrival status:", error);
//       alert("Failed to confirm doctor arrival.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col">
//       {/* Navbar */}
//       <div className="w-full bg-black/30 backdrop-blur-md border-b border-gray-800 p-4 text-center text-lg font-bold"></div>

//       <div className="flex flex-1 overflow-hidden mt-[1vh]">
//         {/* Sidebar */}
//         <div className="w-96 bg-black/30 backdrop-blur-md border-r border-gray-800 p-6 overflow-y-auto mt-7">
//           {/* Emergency Severity Section */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold mb-4">Emergency Severity</h2>
//             <div className="space-y-3">
//               {["normal", "moderate", "critical"].map((level) => (
//                 <motion.button
//                   key={level}
//                   className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
//                     emergencySeverity === level
//                       ? severityColors[level].active
//                       : severityColors[level].default
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setEmergencySeverity(level)}
//                 >
//                   <AlertTriangle className="w-5 h-5" />
//                   <span>{level}</span>
//                 </motion.button>
//               ))}
//             </div>
//           </div>

//           {/* Responding Doctor Section */}
//           <div>
//             <h2 className="text-2xl font-bold mb-4 flex items-center">
//               <ShieldCheck className="w-6 h-6 mr-2 text-green-400" />
//               Responding Doctor
//             </h2>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
//             >
//               {acceptedEmergencies.map((emergency) => (
//                 <div key={emergency._id}>
//                   {" "}
//                   {/* Wrap everything in a div with the key */}
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center space-x-2">
//                       <UserCircle className="w-10 h-10 text-gray-400" />
//                       <div>
//                         <h3 className="font-semibold text-lg">
//                           {emergency.responderId?.name ||
//                             "Responder Not Assigned"}
//                         </h3>
//                         <p className="text-sm text-gray-400">
//                           {emergency.responderId?.role || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-sm text-yellow-400">★</span>
//                   </div>
//                   <div className="space-y-2 text-sm text-gray-300 mt-3">
//                     <div className="flex items-center space-x-2">
//                       <MapPin className="w-4 h-4" />
//                       <span>
//                         {" "}
//                         {calculateDistance(
//                           emergency.patientLocation.lat,
//                           emergency.patientLocation.lng,
//                           emergency.responderLocation.lat,
//                           emergency.responderLocation.lng
//                         )}
//                         km away
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Clock className="w-4 h-4" />
//                       <span>
//                         Estimated Arrival:{" "}
//                         {calculateEstimatedTime(
//                           emergency.patientLocation,
//                           emergency.responderLocation
//                         )}
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <ShieldCheck className="w-4 h-4" />
//                       <span>
//                         LicenseNumber :{" "}
//                         {emergency.responderId?.licenseNo || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 bg-gray-900 p-3 relative overflow-auto">
//           <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg h-full p-4 flex flex-col relative mt-4">
//             <div className="mb-4 flex justify-between items-center">
//               <h2 className="text-2xl font-bold">Emergency Location</h2>
//               <button
//                 onClick={() => setIsChatOpen(!isChatOpen)}
//                 className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full text-white flex items-center shadow-lg"
//               >
//                 <MessageCircle className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="bg-gray-800/50 rounded-lg h-[calc(100%-4rem)] flex items-center justify-center">
//               <div className="flex-1 p-6 overflow-y-auto">
//                 {firstEmergency && firstEmergency.patientLocation && (
//                   <MapContainer
//                     center={[
//                       firstEmergency.patientLocation.lat,
//                       firstEmergency.patientLocation.lng,
//                     ]}
//                     zoom={20}
//                     style={{ height: "500px", width: "100%" }}
//                   >
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                     />

//                     {/* Patient's Marker */}
//                     <Marker
//                       position={[
//                         firstEmergency.patientLocation.lat,
//                         firstEmergency.patientLocation.lng,
//                       ]}
//                       icon={patientIcon}
//                     >
//                       <Popup>Your Location</Popup>
//                     </Marker>

//                     {/* Doctor's Live Location Marker */}
//                     {firstEmergency.responderLocation && (
//                       <Marker
//                         position={[
//                           firstEmergency.responderLocation.lat,
//                           firstEmergency.responderLocation.lng,
//                         ]}
//                         icon={doctorIcon}
//                       >
//                         <Popup>Doctor is on the way!</Popup>
//                       </Marker>
//                     )}
//                     {routeCoords.length > 0 && (
//                       <Polyline positions={routeCoords} color="blue" />
//                     )}
//                   </MapContainer>
//                 )}
//               </div>
//             </div>

//             <div className="flex space-x-4 mt-auto">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex-1 py-4 rounded-lg text-lg font-bold bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-700 flex justify-center items-center space-x-2"
//                 onClick={triggerEmergency}
//                 disabled={!emergencySeverity || isEmergencyTriggered}
//               >
//                 <Ambulance className="w-6 h-6" />
//                 <span>
//                   {isEmergencyTriggered
//                     ? "Emergency Triggered"
//                     : "Trigger Emergency"}
//                 </span>
//               </motion.button>

//               {acceptedEmergencies.map((emergency) => (
//                 <motion.button
//                   key={emergency._id}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex-1 py-4 rounded-lg text-lg font-bold bg-green-500 text-white hover:bg-green-600 flex justify-center items-center space-x-2"
//                   onClick={() => handleDoctorArrival(emergency._id)}
//                 >
//                   <CheckCircle2 className="w-6 h-6" />
//                   <span>
//                     {isDoctorArrived
//                       ? "Doctor Arrived"
//                       : "Confirm Doctor Arrival"}
//                   </span>
//                 </motion.button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Add EmergencyChat component here */}
//       {isChatOpen && acceptedEmergencies.length > 0 && (
//         <EmergencyChat
//           emergencyId={acceptedEmergencies[0]._id}
//           userId={user.id}
//         />
//       )}
//     </div>
//   );
// };

// export default PatientEmergencyDashboard;


"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  AlertTriangle,
  Ambulance,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  UserCircle,
  Clock,
} from "lucide-react";
import EmergencyChat from "../../components/EmergencyChat";
import axios from "axios";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });
const L = dynamic(() => import("leaflet"), { ssr: false });

const patientIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/235/235861.png",
  iconSize: [40, 40],
});

const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
  iconSize: [35, 35],
});

const PatientEmergencyDashboard = () => {
  const [isEmergencyTriggered, setIsEmergencyTriggered] = useState(false);
  const [isDoctorArrived, setIsDoctorArrived] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [acceptedEmergencies, setAcceptedEmergencies] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const [emergencySeverity, setEmergencySeverity] = useState(""); // New state for emergency severity
  const [severitySelected, setSeveritySelected] = useState(false); // Flag to track if severity has been selected

  useEffect(() => {
    // Fetch user from localStorage
    if (typeof window !== "undefined") {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      setUser(userFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    // Fetch accepted emergencies from the API
    const fetchAcceptedEmergencies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/api/emergency/accepted"
        );
        setAcceptedEmergencies(response.data);
        console.log("Accepted emergencies:", response.data);
      } catch (error) {
        console.error("Error fetching accepted emergencies:", error);
        alert("Failed to fetch accepted emergencies.");
      }
    };

    if (user?.role === "patient") {
      fetchAcceptedEmergencies();
    }
  }, [user]);

  const triggerEmergency = async () => {
    if (!user || !user.id) {
      alert("Patient is not logged in.");
      return;
    }

    setLoading(true);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    // If severity is not selected, prompt the user to select it
    if (!emergencySeverity) {
      alert("Please select the severity of the emergency.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        try {
          // Send emergency data with severity to the backend
          await axios.post("http://localhost:3004/api/emergency/trigger", {
            patientId: user.id,
            location,
            severity: emergencySeverity, // Include severity
          });

          alert("Emergency triggered! Searching for nearby doctors...");
          setSeveritySelected(true); // Mark severity as selected
          setIsEmergencyTriggered(true); // Mark emergency as triggered
        } catch (error) {
          console.error(
            "Error triggering emergency:",
            error.response ? error.response.data : error.message
          );
          alert("Failed to trigger emergency.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error getting patient location:", error.message);
        alert("Error getting patient location: " + error.message);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 60000 }
    );
  };

  const handleSeverityChange = (e) => {
    setEmergencySeverity(e.target.value); // Update severity state
  };

  // Ensure there is at least one accepted emergency before rendering the map
  const firstEmergency =
    acceptedEmergencies.length > 0 ? acceptedEmergencies[0] : null;

  const getRoute = async (patientLocation, responderLocation) => {
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

  useEffect(() => {
    if (acceptedEmergencies.length > 0) {
      const firstEmergency = acceptedEmergencies[0];
      if (firstEmergency.patientLocation && firstEmergency.responderLocation) {
        getRoute(
          firstEmergency.patientLocation,
          firstEmergency.responderLocation
        );
      }
    }
  }, [acceptedEmergencies]);

  // Function to calculate distance using the Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance;
  }

  // Function to calculate time based on distance
  function calculateEstimatedTime(
    patientLocation,
    responderLocation,
    speed = 60
  ) {
    // Speed in km/h
    if (!patientLocation || !responderLocation) return "Location data missing";
    console.log(patientLocation, responderLocation);
    const distance = calculateDistance(
      patientLocation.lat,
      patientLocation.lng,
      responderLocation.lat,
      responderLocation.lng
    );

    const timeInHours = distance / speed;
    const timeInMinutes = Math.round(timeInHours * 60); // Convert to minutes

    return `${timeInMinutes} mins`;
  }

  // Severity color mapping
  const severityColors = {
    normal: {
      default: "bg-green-800/50 text-green-400",
      active: "bg-green-500 text-white",
    },
    moderate: {
      default: "bg-yellow-800/50 text-yellow-400",
      active: "bg-yellow-500 text-white",
    },
    critical: {
      default: "bg-red-800/50 text-red-400",
      active: "bg-red-500 text-white",
    },
  };

  const handleDoctorArrival = async (emergencyId) => {
    // Pass the emergency ID
    try {
      console.log(emergencyId);
      await axios.post("http://localhost:3004/api/emergency/doctor-arrival", {
        emergencyId: emergencyId,
        status: "resolved",
      });

      setIsDoctorArrived(true);
      alert("Doctor arrival confirmed. Status updated to resolved.");
    } catch (error) {
      console.error("Error updating doctor arrival status:", error);
      alert("Failed to confirm doctor arrival.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <div className="w-full bg-black/30 backdrop-blur-md border-b border-gray-800 p-4 text-center text-lg font-bold"></div>

      <div className="flex flex-1 overflow-hidden mt-[1vh]">
        {/* Sidebar */}
        <div className="w-96 bg-black/30 backdrop-blur-md border-r border-gray-800 p-6 overflow-y-auto mt-7">
          {/* Emergency Severity Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Emergency Severity</h2>
            <div className="space-y-3">
              {["normal", "moderate", "critical"].map((level) => (
                <motion.button
                  key={level}
                  className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
                    emergencySeverity === level
                      ? severityColors[level].active
                      : severityColors[level].default
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEmergencySeverity(level)}
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>{level}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Responding Doctor Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-2 text-green-400" />
              Responding Doctor
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
            >
              {acceptedEmergencies.map((emergency) => (
                <div key={emergency._id}>
                  {" "}
                  {/* Wrap everything in a div with the key */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <UserCircle className="w-10 h-10 text-gray-400" />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {emergency.responderId?.name ||
                            "Responder Not Assigned"}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {emergency.responderId?.role || "N/A"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-yellow-400">★</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300 mt-3">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {" "}
                        {calculateDistance(
                          emergency.patientLocation.lat,
                          emergency.patientLocation.lng,
                          emergency.responderLocation.lat,
                          emergency.responderLocation.lng
                        )}
                        km away
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        Estimated Arrival:{" "}
                        {calculateEstimatedTime(
                          emergency.patientLocation,
                          emergency.responderLocation
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>
                        LicenseNumber :{" "}
                        {emergency.responderId?.licenseNo || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-900 p-3 relative overflow-auto">
          <div className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-lg h-full p-4 flex flex-col relative mt-4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Emergency Location</h2>
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full text-white flex items-center shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-800/50 rounded-lg h-[calc(100%-4rem)] flex items-center justify-center">
              <div className="flex-1 p-6 overflow-y-auto">
                {firstEmergency && firstEmergency.patientLocation && (
                  <MapContainer
                    center={[
                      firstEmergency.patientLocation.lat,
                      firstEmergency.patientLocation.lng,
                    ]}
                    zoom={20}
                    style={{ height: "500px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />

                    {/* Patient's Marker */}
                    <Marker
                      position={[
                        firstEmergency.patientLocation.lat,
                        firstEmergency.patientLocation.lng,
                      ]}
                      icon={patientIcon}
                    >
                      <Popup>Your Location</Popup>
                    </Marker>

                    {/* Doctor's Live Location Marker */}
                    {firstEmergency.responderLocation && (
                      <Marker
                        position={[
                          firstEmergency.responderLocation.lat,
                          firstEmergency.responderLocation.lng,
                        ]}
                        icon={doctorIcon}
                      >
                        <Popup>Doctor is on the way!</Popup>
                      </Marker>
                    )}
                    {routeCoords.length > 0 && (
                      <Polyline positions={routeCoords} color="blue" />
                    )}
                  </MapContainer>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-4 rounded-lg text-lg font-bold bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-700 flex justify-center items-center space-x-2"
                onClick={triggerEmergency}
                disabled={!emergencySeverity || isEmergencyTriggered}
              >
                <Ambulance className="w-6 h-6" />
                <span>
                  {isEmergencyTriggered
                    ? "Emergency Triggered"
                    : "Trigger Emergency"}
                </span>
              </motion.button>

              {acceptedEmergencies.map((emergency) => (
                <motion.button
                  key={emergency._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-4 rounded-lg text-lg font-bold bg-green-500 text-white hover:bg-green-600 flex justify-center items-center space-x-2"
                  onClick={() => handleDoctorArrival(emergency._id)}
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>
                    {isDoctorArrived
                      ? "Doctor Arrived"
                      : "Confirm Doctor Arrival"}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Add EmergencyChat component here */}
      {isChatOpen && acceptedEmergencies.length > 0 && (
        <EmergencyChat
          emergencyId={acceptedEmergencies[0]._id}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default PatientEmergencyDashboard;
