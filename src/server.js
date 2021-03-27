const express = require("express");
const server = express();

server.get("/", () => console.log("enter"));

server.listen(3000, () => console.log("running server"));