import express = require('express');
import path = require('path');
import http = require("http");
import {GameServer} from "./processes/GameServer";
import socketio = require("socket.io");

const PORT = 3000;

const app = express();
app.use("/", express.static(path.join(__dirname, "../../client")));

const server = http.createServer(app);
const ioServer = socketio(server);

server.listen(PORT, () => {
    console.log(`server is listening on 0.0.0.0:${PORT}`);
    GameServer.initGameServer(ioServer);
});