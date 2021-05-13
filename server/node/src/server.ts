import express from "express";
import http from "http";
import WebSocket from "ws";

const PORT = process.env.PORT || 8080;

let app = express();
let httpServer = http.createServer(app);
let webSocketServer = new WebSocket.Server({ server: httpServer });

webSocketServer.on("connection", (connection: WebSocket) => {
    console.log("Nova conexão");

    connection.on("message", (message: WebSocket.Data) => {
        webSocketServer.clients.forEach((connectionStored: WebSocket) => {
            if (connectionStored !== connection) {
                connectionStored.send(message);
            }
        });
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
