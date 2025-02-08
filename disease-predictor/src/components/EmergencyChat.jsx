"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, X, MessageCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EmergencyChat = ({ emergencyId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize WebSocket
    const ws = new WebSocket("ws://localhost:8081");
    
    ws.onopen = () => {
      console.log("WebSocket Connected");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.data?.emergencyId === emergencyId) {
        setMessages(prev => [...prev, data.data]);
        scrollToBottom();
      }
    };

    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/api/chat/${emergencyId}`
        );
        setMessages(response.data);
        setIsLoading(false);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      }
    };

    fetchMessages();

    return () => {
      if (ws) ws.close();
    };
  }, [emergencyId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      emergencyId,
      senderId: userId,
      senderModel: userId.startsWith("DOC") ? "Doctor" : "Patient",
      message: newMessage.trim(),
      timestamp: new Date()
    };

    try {
      // Send via REST API
      await axios.post("http://localhost:3004/api/chat/send", messageData);
      
      // Send via WebSocket
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(messageData));
      }

      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed ${
          isMinimized ? "bottom-4 right-4 w-auto" : "bottom-4 right-4 w-96"
        } bg-gray-800 rounded-lg shadow-xl border border-gray-700`}
      >
        {/* Chat Header */}
        <div className="p-4 bg-gray-900 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="text-blue-400" />
            <h3 className="font-bold text-white">Emergency Chat</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white"
            >
              {isMinimized ? (
                <MessageCircle className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.senderId === userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        msg.senderId === userId
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-200"
                      } rounded-lg p-3 space-y-1`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-75 text-right">
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default EmergencyChat;
