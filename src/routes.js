const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

routes.get("", (request, response) => response.render(views + "index.ejs"));
routes.get("job", (request, response) => response.render(views + "job.ejs"));
routes.get("jobedit", (request, response) => response.render(views + "job-edit.ejs"));
routes.get("profile", (request, response) => response.render(views + "profile.ejs"));

module.exports = routes;