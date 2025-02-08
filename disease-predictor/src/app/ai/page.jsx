"use client";

// import { useState, useRef, useEffect } from "react";
// import { flushSync } from "react-dom";
// import { Send, Brain, UserRound } from "lucide-react";

// function ConversationDisplayArea({ data, streamdiv, answer }) {
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [data]);

//   return (
//     <div className="flex-1 rounded-3xl border border-gray-600 bg-gray-800 overflow-y-auto p-6 space-y-4 sm:mx-52">
//       {data.map((msg, index) => (
//         <div
//           key={index}
//           className={`flex items-end gap-x-3 ${
//             msg.role === "user" ? "justify-end" : "justify-start"
//           }`}
//         >
//           {msg.role === "model" && (
//             <Brain className="w-8 h-8 text-gray-300 rounded-full p-1 bg-gray-700" />
//           )}
//           <div
//             className={`max-w-[75%] p-4 rounded-2xl shadow-lg text-sm leading-relaxed ${
//               msg.role === "user"
//                 ? "bg-indigo-600 text-white"
//                 : "bg-gray-800 text-gray-200"
//             }`}
//             dangerouslySetInnerHTML={{
//               __html: msg.parts[0].text
//                 .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
//                 .replace(/\n/g, "<br>"),
//             }}
//           />
//           {msg.role === "user" && (
//             <UserRound className="w-8 h-8 text-indigo-300 rounded-full p-1 bg-gray-700" />
//           )}
//         </div>
//       ))}
//       {streamdiv && (
//         <div className="flex items-end gap-x-3 justify-start">
//           <Brain className="w-8 h-8 text-gray-300" />
//           <div
//             className="max-w-[75%] p-4 rounded-2xl bg-gray-800 text-gray-200 shadow-lg"
//             dangerouslySetInnerHTML={{
//               __html: answer
//                 .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
//                 .replace(/\n/g, "<br>"),
//             }}
//           />
//         </div>
//       )}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

// function MessageInput({ inputRef, waiting, handleClick }) {
//   return (
//     <div className="p-4 bg-gray-900 sm:mx-52">
//       <div className="flex items-center space-x-3 max-w-4xl mx-auto bg-gray-800 p-3 rounded-full shadow-lg">
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Type your message..."
//           className="flex-1 bg-transparent text-white outline-none px-3 placeholder-gray-400"
//           disabled={waiting}
//           onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleClick())}
//         />
//         <button
//           onClick={handleClick}
//           className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition duration-200 disabled:opacity-50"
//           disabled={waiting}
//         >
//           <Send className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function ChatPage() {
//   const inputRef = useRef();
//   const host = "http://localhost:3004/api/ai";
//   const streamUrl = `${host}/stream`;
//   const [data, setData] = useState([]);
//   const [answer, setAnswer] = useState("");
//   const [streamdiv, showStreamdiv] = useState(false);
//   const [waiting, setWaiting] = useState(false);

//   const handleClick = () => {
//     if (!inputRef.current.value.trim()) return;
//     handleStreamingChat();
//   };

//   const handleStreamingChat = async () => {
//     const chatData = { chat: inputRef.current.value, history: data };
//     const ndata = [...data, { role: "user", parts: [{ text: inputRef.current.value }] }];
//     flushSync(() => {
//       setData(ndata);
//       inputRef.current.value = "";
//       inputRef.current.placeholder = "Waiting for response...";
//       setWaiting(true);
//     });
//     try {
//       setAnswer("");
//       const response = await fetch(streamUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(chatData),
//       });
//       if (!response.ok || !response.body) throw response.statusText;
//       const reader = response.body.getReader();
//       const txtdecoder = new TextDecoder();
//       showStreamdiv(true);
//       let modelResponse = "";
//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         const decodedTxt = txtdecoder.decode(value, { stream: true });
//         setAnswer((prev) => prev + decodedTxt);
//         modelResponse += decodedTxt;
//       }
//       setData([...ndata, { role: "model", parts: [{ text: modelResponse }] }]);
//     } catch {
//       setData([...ndata, { role: "model", parts: [{ text: "Error occurred" }] }]);
//     } finally {
//       setAnswer("");
//       showStreamdiv(false);
//       inputRef.current.placeholder = "Type your message...";
//       setWaiting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-white pt-24">
//       <div className="text-center mb-8">
//         <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
//           AI Assistance
//         </h1>
//         <p className="text-gray-400 text-lg font-medium tracking-wider">
//           GEMINI-POWERED MEDICAL AI ASSISTANT • VERSION 1.0
//         </p>
//       </div>
//       <ConversationDisplayArea data={data} streamdiv={streamdiv} answer={answer} />
//       <MessageInput inputRef={inputRef} waiting={waiting} handleClick={handleClick} />
//     </div>
//   );
// }


// "use client";

// import { useState, useRef, useEffect } from "react";
// import { flushSync } from "react-dom";
// import { Send, HeartHandshake, UserRound } from "lucide-react";

// function RequestDisplayArea({ requests, handleAccept }) {
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [requests]);

//   return (
//     <div className="flex-1 rounded-3xl border border-gray-600 bg-gray-800 overflow-y-auto p-6 space-y-4 sm:mx-52">
//       {requests.map((req, index) => (
//         <div key={index} className="flex items-start gap-x-3 justify-start">
//           <UserRound className="w-8 h-8 text-red-300 rounded-full p-1 bg-gray-700" />
//           <div className="max-w-[75%] p-4 rounded-2xl shadow-lg text-sm leading-relaxed bg-gray-800 text-gray-200">
//             <strong>Blood Group:</strong> {req.bloodGroup} <br />
//             <strong>Units:</strong> {req.units} <br />
//             <strong>Urgency:</strong> {req.urgency} <br />
//             {!req.accepted ? (
//               <button
//                 className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 onClick={() => handleAccept(index)}
//               >
//                 Accept Request
//               </button>
//             ) : (
//               <span className="text-green-400">Accepted by a donor</span>
//             )}
//           </div>
//         </div>
//       ))}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

// function RequestInput({ handleRequest }) {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [units, setUnits] = useState("");
//   const [urgency, setUrgency] = useState("");

//   return (
//     <div className="p-4 bg-gray-900 sm:mx-52">
//       <div className="flex flex-col space-y-3 max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
//         <input
//           type="text"
//           placeholder="Blood Group (e.g., A+, B-, O+)"
//           className="p-3 bg-gray-900 text-white rounded-lg outline-none placeholder-gray-400"
//           value={bloodGroup}
//           onChange={(e) => setBloodGroup(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Required Units"
//           className="p-3 bg-gray-900 text-white rounded-lg outline-none placeholder-gray-400"
//           value={units}
//           onChange={(e) => setUnits(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Urgency (e.g., High, Medium, Low)"
//           className="p-3 bg-gray-900 text-white rounded-lg outline-none placeholder-gray-400"
//           value={urgency}
//           onChange={(e) => setUrgency(e.target.value)}
//         />
//         <button
//           onClick={() => handleRequest(bloodGroup, units, urgency)}
//           className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
//         >
//           <Send className="w-5 h-5 inline-block mr-2" /> Submit Request
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function BloodDonationPage() {
//   const [requests, setRequests] = useState([]);

//   const handleRequest = (bloodGroup, units, urgency) => {
//     if (!bloodGroup.trim() || !units.trim() || !urgency.trim()) return;
//     flushSync(() => {
//       setRequests([...requests, { bloodGroup, units, urgency, accepted: false }]);
//     });
//   };

//   const handleAccept = (index) => {
//     setRequests((prevRequests) => {
//       const updatedRequests = [...prevRequests];
//       updatedRequests[index].accepted = true;
//       return updatedRequests;
//     });
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-white pt-24">
//       <div className="text-center mb-8">
//         <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-red-500">
//           Blood Donation Requests
//         </h1>
//         <p className="text-gray-400 text-lg font-medium tracking-wider">
//           SAVE LIVES, DONATE BLOOD
//         </p>
//       </div>
//       <RequestDisplayArea requests={requests} handleAccept={handleAccept} />
//       <RequestInput handleRequest={handleRequest} />
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { Send, UserRound, Droplets } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const BloodDrop = () => (
//   <motion.div
//     initial={{ y: -100, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     exit={{ y: 100, opacity: 0 }}
//     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//   >
//     <Droplets className="w-16 h-16 text-orange-500" />
//   </motion.div>
// );

// function RequestDisplayArea({ requests, currentUser, handleAccept }) {
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [requests]);

//   return (
//     <div className="flex-1 rounded-3xl border border-orange-200 bg-white overflow-y-auto p-6 space-y-4 sm:mx-52">
//       {requests.map((req, index) => (
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           key={index}
//           className="flex items-start gap-x-3 justify-start"
//         >
//           <UserRound className="w-8 h-8 text-orange-500 rounded-full p-1 bg-orange-100" />
//           <div className="max-w-[75%] p-4 rounded-2xl shadow-lg text-sm leading-relaxed bg-orange-50 text-gray-800">
//             <strong className="text-orange-700">Blood Group:</strong> {req.bloodGroup} <br />
//             <strong className="text-orange-700">Units:</strong> {req.units} <br />
//             <strong className="text-orange-700">Urgency:</strong> {req.urgency} <br />
//             {currentUser !== req.userId && !req.accepted && (
//               <button
//                 className="mt-2 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//                 onClick={() => handleAccept(index)}
//               >
//                 Accept Request
//               </button>
//             )}
//             {req.accepted && (
//               <span className="text-green-600 font-medium">Accepted by a donor</span>
//             )}
//           </div>
//         </motion.div>
//       ))}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

// function RequestInput({ handleRequest }) {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [units, setUnits] = useState("");
//   const [urgency, setUrgency] = useState("");
//   const [showDrop, setShowDrop] = useState(false);

//   const handleSubmit = () => {
//     if (!bloodGroup.trim() || !units.trim() || !urgency.trim()) return;
//     setShowDrop(true);
//     handleRequest(bloodGroup, units, urgency);
//     setTimeout(() => setShowDrop(false), 1500);
//     setBloodGroup("");
//     setUnits("");
//     setUrgency("");
//   };

//   return (
//     <div className="p-4 bg-white sm:mx-52 relative">
//       <AnimatePresence>
//         {showDrop && <BloodDrop />}
//       </AnimatePresence>
//       <div className="flex flex-col space-y-3 max-w-4xl mx-auto bg-orange-50 p-6 rounded-2xl shadow-lg">
//         <input
//           type="text"
//           placeholder="Blood Group (e.g., A+, B-, O+)"
//           className="p-3 bg-white text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 placeholder-gray-400"
//           value={bloodGroup}
//           onChange={(e) => setBloodGroup(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Required Units"
//           className="p-3 bg-white text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 placeholder-gray-400"
//           value={units}
//           onChange={(e) => setUnits(e.target.value)}
//         />
//         <select
//           value={urgency}
//           onChange={(e) => setUrgency(e.target.value)}
//           className="p-3 bg-white text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400"
//         >
//           <option value="">Select Urgency Level</option>
//           <option value="High">High</option>
//           <option value="Medium">Medium</option>
//           <option value="Low">Low</option>
//         </select>
//         <button
//           onClick={handleSubmit}
//           className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition duration-200"
//         >
//           <Send className="w-5 h-5 inline-block mr-2" /> Submit Request
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function BloodDonationPage() {
//   const [requests, setRequests] = useState([]);
//   const [currentUser] = useState("user-" + Math.random().toString(36).substr(2, 9));

//   const handleRequest = (bloodGroup, units, urgency) => {
//     if (!bloodGroup.trim() || !units.trim() || !urgency.trim()) return;
//     const newRequest = {
//       bloodGroup,
//       units,
//       urgency,
//       accepted: false,
//       userId: currentUser,
//       timestamp: new Date().toISOString(),
//     };
//     setRequests([...requests, newRequest]);
//   };

//   const handleAccept = (index) => {
//     setRequests((prevRequests) => {
//       const updatedRequests = [...prevRequests];
//       updatedRequests[index].accepted = true;
//       return updatedRequests;
//     });
//   };

//   return (
//     <div className="flex flex-col h-screen bg-orange-50 text-gray-800 pt-24">
//       <div className="text-center mb-8">
//         <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
//           Blood Donation Requests
//         </h1>
//         <p className="text-orange-600 text-lg font-medium tracking-wider mt-2">
//           SAVE LIVES, DONATE BLOOD
//         </p>
//       </div>
//       <RequestDisplayArea 
//         requests={requests} 
//         currentUser={currentUser} 
//         handleAccept={handleAccept} 
//       />
//       <RequestInput handleRequest={handleRequest} />
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { Send, UserRound, Droplets, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// const UrgencyBadge = ({ urgency }) => {
//   const colors = {
//     High: "bg-red-100 text-red-700 border-red-200",
//     Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
//     Low: "bg-green-100 text-green-700 border-green-200"
//   };

//   return (
//     <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${colors[urgency]}`}>
//       {urgency}
//     </span>
//   );
// };

// const BloodDrop = () => (
//   <motion.div
//     initial={{ y: -100, opacity: 0, scale: 0.5 }}
//     animate={{ 
//       y: [0, 20, 0],
//       opacity: [0, 1, 0],
//       scale: [0.5, 1.2, 0.8]
//     }}
//     transition={{ duration: 1.5, times: [0, 0.5, 1] }}
//     className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
//   >
//     <div className="relative">
//       <Droplets className="w-24 h-24 text-red-500" />
//       <motion.div
//         className="absolute inset-0"
//         animate={{ 
//           boxShadow: ["0 0 20px rgba(239, 68, 68, 0)", "0 0 40px rgba(239, 68, 68, 0.5)", "0 0 20px rgba(239, 68, 68, 0)"]
//         }}
//         transition={{ duration: 1.5, times: [0, 0.5, 1] }}
//       />
//     </div>
//   </motion.div>
// );

// const RequestCard = ({ request, currentUser, onAccept }) => {
//   const isOwner = request.userId === currentUser;
//   const urgencyColors = {
//     High: "from-red-500 to-orange-500",
//     Medium: "from-yellow-500 to-orange-500",
//     Low: "from-green-500 to-teal-500"
//   };

//   return (
//     <motion.div
//       initial={{ x: -100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       className="group"
//     >
//       <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
//         <div className={`absolute top-0 h-1 w-full bg-gradient-to-r ${urgencyColors[request.urgency]}`} />
//         <div className="p-6">
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <UserRound className="w-12 h-12 text-orange-500 rounded-full p-2 bg-orange-100" />
//                 {request.accepted && (
//                   <CheckCircle2 className="absolute -bottom-1 -right-1 w-5 h-5 text-green-500 bg-white rounded-full" />
//                 )}
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Blood Group: {request.bloodGroup}
//                 </h3>
//                 <div className="flex items-center gap-2 mt-1">
//                   <UrgencyBadge urgency={request.urgency} />
//                   <span className="text-sm text-gray-500 flex items-center gap-1">
//                     <Clock className="w-4 h-4" /> {new Date(request.timestamp).toLocaleTimeString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-2xl font-bold text-orange-500">{request.units}</span>
//               <span className="text-sm text-gray-500">units</span>
//             </div>
//           </div>

//           <div className="mt-4 flex items-center justify-between">
//             {!request.accepted ? (
//               <>
//                 {!isOwner ? (
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200"
//                     onClick={() => onAccept(request.id)}
//                   >
//                     Accept Request
//                   </motion.button>
//                 ) : (
//                   <Alert className="bg-orange-50 text-orange-800 border-orange-200">
//                     <AlertDescription>
//                       This is your request. You cannot accept your own request.
//                     </AlertDescription>
//                   </Alert>
//                 )}
//               </>
//             ) : (
//               <span className="flex items-center gap-2 text-green-600 font-medium">
//                 <CheckCircle2 className="w-5 h-5" />
//                 Request Accepted
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// function RequestDisplayArea({ requests, currentUser, handleAccept }) {
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [requests]);

//   return (
//     <div className="flex-1 overflow-y-auto px-6 space-y-4 sm:px-52 hide-scrollbar">
//       <AnimatePresence>
//         {requests.map((request) => (
//           <RequestCard
//             key={request.id}
//             request={request}
//             currentUser={currentUser}
//             onAccept={handleAccept}
//           />
//         ))}
//       </AnimatePresence>
//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

// function RequestInput({ handleRequest }) {
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [units, setUnits] = useState("");
//   const [urgency, setUrgency] = useState("");
//   const [showDrop, setShowDrop] = useState(false);

//   const handleSubmit = () => {
//     if (!bloodGroup.trim() || !units.trim() || !urgency.trim()) return;
//     setShowDrop(true);
//     handleRequest(bloodGroup, units, urgency);
//     setTimeout(() => setShowDrop(false), 1500);
//     setBloodGroup("");
//     setUnits("");
//     setUrgency("");
//   };

//   return (
//     <div className="p-4 bg-white/50 backdrop-blur-sm sm:px-52 sticky bottom-0">
//       <AnimatePresence>
//         {showDrop && <BloodDrop />}
//       </AnimatePresence>
//       <motion.div
//         initial={false}
//         animate={{ y: 0, opacity: 1 }}
//         className="flex flex-col space-y-3 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-orange-100"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           <input
//             type="text"
//             placeholder="Blood Group (e.g., A+, B-, O+)"
//             className="p-3 bg-gray-50 text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 placeholder-gray-400 transition-colors duration-200"
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Required Units"
//             className="p-3 bg-gray-50 text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 placeholder-gray-400 transition-colors duration-200"
//             value={units}
//             onChange={(e) => setUnits(e.target.value)}
//           />
//           <select
//             value={urgency}
//             onChange={(e) => setUrgency(e.target.value)}
//             className="p-3 bg-gray-50 text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 transition-colors duration-200"
//           >
//             <option value="">Select Urgency Level</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>
//         <motion.button
//           whileHover={{ scale: 1.01 }}
//           whileTap={{ scale: 0.99 }}
//           onClick={handleSubmit}
//           className="p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition duration-200 font-medium shadow-lg hover:shadow-xl"
//         >
//           <Send className="w-5 h-5 inline-block mr-2" /> Submit Request
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// }

// export default function BloodDonationPage() {
//   const [requests, setRequests] = useState([]);
//   const [currentUser] = useState("user-" + Math.random().toString(36).substr(2, 9));

//   const handleRequest = (bloodGroup, units, urgency) => {
//     if (!bloodGroup.trim() || !units.trim() || !urgency.trim()) return;
//     const newRequest = {
//       id: Math.random().toString(36).substr(2, 9),
//       bloodGroup,
//       units,
//       urgency,
//       accepted: false,
//       userId: currentUser,
//       timestamp: new Date().toISOString(),
//     };
//     setRequests([...requests, newRequest]);
//   };

//   const handleAccept = (requestId) => {
//     setRequests((prevRequests) =>
//       prevRequests.map((request) =>
//         request.id === requestId
//           ? { ...request, accepted: true }
//           : request
//       )
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 to-red-50">
//       <div className="text-center py-12 px-4">
//         <motion.h1 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-500 to-orange-600"
//         >
//           Blood Donation Requests
//         </motion.h1>
//         <motion.p 
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-orange-800 text-lg font-medium tracking-wider mt-2"
//         >
//           EVERY DROP COUNTS, SAVE LIVES TODAY
//         </motion.p>
//       </div>
//       <RequestDisplayArea 
//         requests={requests} 
//         currentUser={currentUser} 
//         handleAccept={handleAccept} 
//       />
//       <RequestInput handleRequest={handleRequest} />
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { Send, UserRound, Droplets, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UrgencyBadge = ({ urgency }) => {
  const colors = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-green-100 text-green-700 border-green-200"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${colors[urgency]}`}>
      {urgency}
    </span>
  );
};

const BloodDrop = () => (
  <motion.div
    initial={{ y: -100, opacity: 0, scale: 0.5 }}
    animate={{ 
      y: [0, 20, 0],
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.8]
    }}
    transition={{ duration: 1.5, times: [0, 0.5, 1] }}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
  >
    <div className="relative">
      <Droplets className="w-24 h-24 text-red-500" />
      <motion.div
        className="absolute inset-0"
        animate={{ 
          boxShadow: ["0 0 20px rgba(239, 68, 68, 0)", "0 0 40px rgba(239, 68, 68, 0.5)", "0 0 20px rgba(239, 68, 68, 0)"]
        }}
        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
      />
    </div>
  </motion.div>
);

const RequestCard = ({ request, currentUser, onAccept }) => {
  const isOwner = request.userId === currentUser;
  const urgencyColors = {
    High: "from-red-500 to-orange-500",
    Medium: "from-yellow-500 to-orange-500",
    Low: "from-green-500 to-teal-500"
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="group"
    >
      <div className={`relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <div className={`absolute top-0 h-1 w-full bg-gradient-to-r ${urgencyColors[request.urgency]}`} />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <UserRound className="w-12 h-12 text-orange-500 rounded-full p-2 bg-orange-100" />
                {request.accepted && (
                  <CheckCircle2 className="absolute -bottom-1 -right-1 w-5 h-5 text-green-500 bg-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Blood Group: {request.bloodGroup}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <UrgencyBadge urgency={request.urgency} />
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {new Date(request.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-orange-500">{request.units}</span>
              <span className="text-sm text-gray-500">units</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {!request.accepted ? (
              <>
                {!isOwner ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200"
                    onClick={() => onAccept(request.id)}
                  >
                    Accept Request
                  </motion.button>
                ) : (
                  <div className="bg-orange-50 text-orange-800 border-orange-200 p-2 rounded-lg">
                    <span>This is your request. You cannot accept your own request.</span>
                  </div>
                )}
              </>
            ) : (
              <span className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle2 className="w-5 h-5" />
                Request Accepted
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function RequestDisplayArea({ requests, currentUser, handleAccept }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [requests]);

  return (
    <div className="flex-1 overflow-y-auto px-6 space-y-4 sm:px-52 hide-scrollbar">
      <AnimatePresence>
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            currentUser={currentUser}
            onAccept={handleAccept}
          />
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}

function RequestInput({ handleRequest }) {
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [urgency, setUrgency] = useState("");
  const [showDrop, setShowDrop] = useState(false);

  const handleSubmit = () => {
    if (!bloodGroup.trim() || !units.trim() || !urgency.trim()) return;
    setShowDrop(true);
    handleRequest(bloodGroup, units, urgency);
    setTimeout(() => setShowDrop(false), 1500);
    setBloodGroup("");
    setUnits("");
    setUrgency("");
  };

  return (
    <div className="p-4 bg-white/50 backdrop-blur-sm sm:px-52 sticky bottom-0">
      <AnimatePresence>
        {showDrop && <BloodDrop />}
      </AnimatePresence>
      <motion.div
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col space-y-3 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-orange-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Blood Group (e.g., A+, B-, O+)"
            className="p-3 bg-gray-50 text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 placeholder-gray-400 transition-colors duration-200"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />
          <input
            type="number"
            placeholder="Required Units"
            className="p-3 bg-gray-50 text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 placeholder-gray-400 transition-colors duration-200"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          />
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="p-3 bg-gray-50 text-gray-800 rounded-lg outline-none border border-orange-200 focus:border-orange-400 transition-colors duration-200"
          >
            <option value="">Select Urgency Level</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSubmit}
          className="p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          <Send className="w-5 h-5 inline-block mr-2" /> Submit Request
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function BloodDonationPage() {
  const [requests, setRequests] = useState([]);
  const [currentUser] = useState("user-" + Math.random().toString(36).substr(2, 9));

  const handleRequest = (bloodGroup, units, urgency) => {
    if (!bloodGroup.trim() || !units.trim() || !urgency.trim()) return;
    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      bloodGroup,
      units,
      urgency,
      accepted: false,
      userId: currentUser,
      timestamp: new Date().toISOString(),
    };
    setRequests([...requests, newRequest]);
  };

  const handleAccept = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? { ...request, accepted: true }
          : request
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center py-12 px-4">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-500 to-orange-600"
        >
          Blood Donation Requests
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-orange-800 text-lg font-medium tracking-wider mt-2"
        >
          EVERY DROP COUNTS, SAVE LIVES TODAY
        </motion.p>
      </div>
      <RequestDisplayArea 
        requests={requests} 
        currentUser={currentUser} 
        handleAccept={handleAccept} 
      />
      <RequestInput handleRequest={handleRequest} />
    </div>
  );
}