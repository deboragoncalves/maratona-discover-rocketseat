const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profiles = {
  data: {
    name: "Débora",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4D03AQFvSDG5L4z6BA/profile-displayphoto-shrink_800_800/0/1610104702023?e=1622678400&v=beta&t=jP6j9SPGyZILlMv0PB_tdzPo5AvPnHu9gyr5j0F_lsg",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4,
    "value-hour": 75,
  },

  controllers: {
      updateProfile: (request, response) => response.render(views + "profile.ejs", { profile: Profiles.data }),

      profileCreate: (request, response) => {
        
        const dataProfile = request.body;

        const weeksYear = 52;

        const weeksMonth = (weeksYear - dataProfile["vacation-per-year"]) / 12;

        // Horas trabalhadas semana e mês

        const workHoursWeek = dataProfile["days-per-week"] * dataProfile["hours-per-day"];

        const workHoursMonth = workHoursWeek * weeksMonth;

        dataProfile["value-hour"] = dataProfile["monthly-budget"] / workHoursMonth;

        // Atualizar data

        Profiles.data = dataProfile;

        return response.redirect('/profile');
      },
  }
};

const Jobs = {
  controllers: {
    jobsUpdated(request, response) {
      // Map: novo array job

      const updatedJobs = Jobs.datas.arrayJobs.map((job) => {
        const deadline = Jobs.datas.remainingDays(job);
        const status = deadline <= 0 ? "done" : "progress";

        const budget = Jobs.datas.calculateBudget(job, Profiles.data["value-hour"]);

        return {
          ...job,
          deadline,
          status,
          budget,
        };
      });

      return response.render(views + "index.ejs", { jobs: updatedJobs });
    },

    jobCreated: (request, response) => {
      // Request body: dados do form. { name: 'Debora', ... }

      const job = request.body;

      const lastId = Jobs.datas.arrayJobs[Jobs.datas.arrayJobs.length - 1]?.id || 1;

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
        return response.render(views + "job.ejs");
    },

    showDataJobEdit: (request, response) => { 

        const jobId = request.params.id;

        const job = Jobs.datas.arrayJobs.find(job => Number(job.id) === Number(jobId));

        job.budget = Jobs.datas.calculateBudget(job, Profiles.data["value-hour"]);

        if (!job) {
            return response.send("Job not found");
        }

        return response.render(views + "job-edit.ejs", { job: job })
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
routes.get("/profile", Profiles.controllers.updateProfile);
routes.post("/profile", Profiles.controllers.profileCreate);

module.exports = routes;
