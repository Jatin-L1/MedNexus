const WebSocket = require('ws');
const mongoose = require('mongoose');

// Create Chat Message Schema
const ChatMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  emergencyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  senderType: { type: String, enum: ['patient', 'doctor'], required: true }
});

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

// Initialize WebSocket server for chat
const initChatWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  // Mapping to track active connections
  const clients = new Map();

  wss.on('connection', (ws, req) => {
    // Extract emergency ID and user ID from connection URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const emergencyId = url.searchParams.get('emergencyId');
    const userId = url.searchParams.get('userId');

    if (!emergencyId || !userId) {
      ws.close();
      return;
    }

    // Store the WebSocket connection
    if (!clients.has(emergencyId)) {
      clients.set(emergencyId, new Map());
    }
    clients.get(emergencyId).set(userId, ws);

    ws.on('message', async (messageData) => {
      try {
        const { senderId, senderType, message } = JSON.parse(messageData);

        // Save message to database
        const chatMessage = new ChatMessage({
          senderId,
          receiverId: senderType === 'patient' ? 'doctorId' : 'patientId', // You'll need to replace with actual logic
          emergencyId,
          message,
          senderType
        });
        await chatMessage.save();

        // Broadcast message to all participants in this emergency
        const emergencyClients = clients.get(emergencyId);
        emergencyClients.forEach((client, clientId) => {
          if (client.readyState === WebSocket.OPEN && clientId !== senderId) {
            client.send(JSON.stringify({
              senderId,
              senderType,
              message,
              timestamp: new Date().toISOString()
            }));
          }
        });
      } catch (error) {
        console.error('Error processing chat message:', error);
      }
    });

    ws.on('close', () => {
      const emergencyClients = clients.get(emergencyId);
      emergencyClients.delete(userId);
      if (emergencyClients.size === 0) {
        clients.delete(emergencyId);
      }
    });
  });

  return wss;
};

module.exports = {
  initChatWebSocket,
  ChatMessage
};