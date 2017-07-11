import * as Express from "express";
import * as Path from "path";
import http = require("http");

const PORT = 3000;

const app = Express();
const server = http.createServer(app);
console.log(Path.join(__dirname, "bin"));
app.get("/", (req, res) => {

});
server.listen(PORT, () => {
    console.log(`server is listening on 0.0.0.0:${PORT}`);
});