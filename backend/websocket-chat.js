const WebSocket = require('ws');

function initChatWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('WebSocket Client Connected');

        ws.on('message', (message) => {
            try {
                const parsedMessage = JSON.parse(message.toString());
                console.log('Received Message:', parsedMessage);

                // Broadcast to all connected clients
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ 
                            status: 'Message received', 
                            data: parsedMessage 
                        }));
                    }
                });
            } catch (error) {
                console.error('WebSocket Message Error:', error);
            }
        });

        ws.on('close', () => {
            console.log('WebSocket Client Disconnected');
        });
    });

    console.log('Chat WebSocket Server Initialized');
}

module.exports = { initChatWebSocket };
