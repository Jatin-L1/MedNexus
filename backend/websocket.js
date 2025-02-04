// websocket.js
const WebSocket = require('ws');

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);

    // You can broadcast this message (location update) to other clients (e.g., the patient) here
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message); // Send location to other clients
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

// Export WebSocket server for use in index.js
module.exports = wss;
