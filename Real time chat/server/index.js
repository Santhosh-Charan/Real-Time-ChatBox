// server/index.js
const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('🟢 New client connected. Total clients:', wss.clients.size);

  ws.on('message', (message) => {
    console.log('📨 Message received:', message);

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('🔴 Client disconnected. Total clients:', wss.clients.size);
  });
});
