const express = require("express");
const routes = express.Router();
const profileController = require("./controllers/profile-controller");
const profile = require("./model/profile");

const Jobs = {
  controllers: {
    jobsUpdated(request, response) {
      // Map: novo array job

      const updatedJobs = Jobs.datas.arrayJobs.map((job) => {
        const deadline = Jobs.datas.remainingDays(job);
        const status = deadline <= 0 ? "done" : "progress";

        const budget = Jobs.datas.calculateBudget(job, profile["value-hour"]);

        return {
          ...job,
          deadline,
          status,
          budget,
        };
      });

      return response.render("index.ejs", { jobs: updatedJobs });
    },

    jobCreated: (request, response) => {
      // Request body: dados do form. { name: 'Debora', ... }

      const job = request.body;

      const lastId = Jobs.datas.arrayJobs[Jobs.datas.arrayJobs.length - 1]?.id || 0;

      Jobs.datas.arrayJobs.push({
        id: lastId + 1,
        name: job.name,
        "daily-hours": job["daily-hours"],
        "total-hours": job["total-hours"],
        createdAt: Date.now(),
      });

      // Date now: milissegundos desde 1970

      return response.redirect("/");
    },

    jobEdited: (request, response) => {
        return response.render("job.ejs");
    },

    showDataJobEdit: (request, response) => { 

        const jobId = request.params.id;

        const job = Jobs.datas.arrayJobs.find(job => Number(job.id) === Number(jobId));

        job.budget = Jobs.datas.calculateBudget(job, profile["value-hour"]);

        if (!job) {
            return response.send("Job not found");
        }

        return response.render("job-edit.ejs", { job: job })
    },

    jobUpdatedById: (request, response) => {

        const jobId = request.params.id;

        const job = Jobs.datas.arrayJobs.find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return response.send("Job not found");
        }

        const updatedJob = {
            ...job,
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"],
        }

        // Atualizar

        Jobs.datas.arrayJobs = Jobs.datas.arrayJobs.map(job => {

            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }
            
            return job;
        });

        response.redirect('/job/' + jobId);

    },

    jobDeletedById: (request, response) => {

        const jobId = request.params.id;

        Jobs.datas.arrayJobs = Jobs.datas.arrayJobs.filter(job => Number(job.id) !== Number(jobId));

        return response.redirect('/');

    }
  },

  datas: {
    remainingDays: (job) => {
      // Prazo em dias

      // To fixed: retorna string

      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

      const dateCreated = new Date(job["createdAt"]);

      // Dia final

      const dueDay = dateCreated.getDate() + Number(remainingDays);

      // Data final ms

      const dueDateMs = dateCreated.setDate(dueDay);

      const differenceMs = dueDateMs - Date.now();

      // 1000 * 60 = s * 60 = h * 24 = d

      const daysMs = 1000 * 60 * 60 * 24;

      const deadline = Math.floor(differenceMs / daysMs);

      return deadline;
    },

    arrayJobs: [
      {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        createdAt: Date.now(),
      },
      {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        createdAt: Date.now(),
      },
    ],

    calculateBudget: (job, valueHours) => valueHours * job["total-hours"],
  },
};

routes.get("", Jobs.controllers.jobsUpdated);
routes.get("/job", Jobs.controllers.jobEdited);
routes.post("/job", Jobs.controllers.jobCreated);
routes.get("/job/:id", Jobs.controllers.showDataJobEdit);
routes.post("/job/:id", Jobs.controllers.jobUpdatedById);
routes.post("/job/delete/:id", Jobs.controllers.jobDeletedById);
routes.get("/profile", profileController.updateProfile);
routes.post("/profile", profileController.profileCreate);

module.exports = routes;
