import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const PORT = process.env.PORT || 8080;

let app = express();
let server = http.createServer(app);
let io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket: Socket) => {
    console.log(`Nova conexão: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Conexão encerrada: ${socket.id}`);
    });

    socket.on("message", (message: any) => {
        socket.broadcast.emit("message", message);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
