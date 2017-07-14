import express = require('express');
import path = require('path');
import http = require("http");
import * as gameStart from "./processes/gameStart";

const PORT = 3000;

const app = express();
app.use("/", express.static(path.join(__dirname, "../../client")));
console.log(path.join(__dirname));
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`server is listening on 0.0.0.0:${PORT}`);
});