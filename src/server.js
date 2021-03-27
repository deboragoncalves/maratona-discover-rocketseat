const express = require("express");
const server = express();

server.get("/", (request, response) => {
    console.log("enter");
    return response.send("Hello World")
});

server.listen(3000, () => console.log("running server"));