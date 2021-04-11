const dataJob = require("../model/job");
const jobUtils = require("../utils/job-utils");
const dataProfile = require("../model/profile");

module.exports = {
  
    jobCreated: (request, response) => {

      const jobs = dataJob.get();

      // Request body: dados do form. { name: 'Debora', .. }

      const job = request.body;

      const lastId = jobs[jobs.length - 1]?.id || 0;

      jobs.push({
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
        
      const jobs = dataJob.get();
      const profile = dataProfile.get();

        const jobId = request.params.id;

        const job = jobs.find(job => Number(job.id) === Number(jobId));

        job.budget = jobUtils.calculateBudget(job, profile["value-hour"]);

        if (!job) {
            return response.send("Job not found");
        }

        return response.render("job-edit.ejs", { job: job })
    },

    jobUpdatedById: (request, response) => {

      const jobs = dataJob.get();

        const jobId = request.params.id;

        const job = jobs.find(job => Number(job.id) === Number(jobId));

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

        const newJobs = jobs.map(job => {

            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }
            
            return job;
        });

        // Atualizar o job no model

        dataJob.update(newJobs);

        response.redirect('/job/' + jobId);

    },

    jobDeletedById: (request, response) => {

        const jobId = request.params.id;

        dataJob.delete(jobId);

        return response.redirect('/');

    }
  }