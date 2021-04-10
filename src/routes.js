const express = require("express");
const routes = express.Router();
const profileController = require("./controllers/profile-controller");
const jobController = require("./controllers/job-controller");
const profile = require("./model/profile");

routes.get("", jobController.jobsUpdated);
routes.get("/job", jobController.jobEdited);
routes.post("/job", jobController.jobCreated);
routes.get("/job/:id", jobController.showDataJobEdit);
routes.post("/job/:id", jobController.jobUpdatedById);
routes.post("/job/delete/:id", jobController.jobDeletedById);
routes.get("/profile", profileController.updateProfile);
routes.post("/profile", profileController.profileCreate);

module.exports = routes;
