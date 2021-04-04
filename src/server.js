const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

// ejs - template engine
server.set('view engine', 'ejs');

// Usar body do request
server.use(express.urlencoded({ extended: true }));

// Pasta views: todos os arquivos do projeto terão esse path

// Primeiro argumento: pasta padrão
// Dir name: pasta
// Join: unir

server.set("views", path.join(__dirname, "views"));

server.use(express.static("public"))
server.use(routes);

server.listen(3000, () => console.log("running server"));