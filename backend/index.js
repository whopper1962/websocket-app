const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3001;

wss.on("connection", (ws) => {
  console.log("Client connected!");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "initialize") {
      ws.userId = data.userId;
    } else {
      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          (client.userId === data.sender || client.userId === data.recipient)
        ) {
          client.send(data.message);
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
