'use client'
import React, { useState } from 'react';
import { Send, Clock } from 'lucide-react';

const EmergencyChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'I am on my way. How is the patient doing?', time: '10:31 AM' },
    { id: 2, sender: 'patient', text: 'The pain is still there but stable', time: '10:32 AM' },
    { id: 3, sender: 'doctor', text: 'Keep monitoring breathing. I\'m 8 minutes away.', time: '10:32 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'patient',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-gray-900 rounded-lg shadow-xl border border-gray-800">
      <div className="p-4 border-b border-gray-800 bg-black/30">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Dr. Richard Wilson</h3>
          <div className="flex items-center text-green-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>8 min away</span>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} 
               className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              message.sender === 'patient' 
                ? 'bg-blue-500/20 text-blue-100' 
                : 'bg-gray-800/50 text-gray-100'
            }`}>
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-60">{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800 bg-black/30">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg p-2 text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyChat;