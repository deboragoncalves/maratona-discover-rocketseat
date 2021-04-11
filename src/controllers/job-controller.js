const dataJob = require("../model/job");
const jobUtils = require("../utils/job-utils");
const dataProfile = require("../model/profile");

module.exports = {
  
    async jobCreated(request, response) {

      // Request body: dados do form. { name: 'Debora', .. }

      const job = request.body;

      await dataJob.add({
        name: job.name,
        "daily-hours": job["daily-hours"],
        "total-hours": job["total-hours"],
        createdAt: Date.now()
      });

      // Date now: milissegundos desde 1970

      return response.redirect("/");
    },

    jobEdited: (request, response) => {
        return response.render("job.ejs");
    },

    async showDataJobEdit(request, response) { 
        
      const jobs = await dataJob.get();
      const profile = await dataProfile.get();

        const jobId = request.params.id;

        const job = jobs.find(job => Number(job.id) === Number(jobId));

        job.budget = jobUtils.calculateBudget(job, profile["value-hour"]);

        if (!job) {
            return response.send("Job not found");
        }

        return response.render("job-edit.ejs", { job: job })
    },

    async jobUpdatedById (request, response) {

        const jobId = request.params.id;

        const updatedJob = {
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"],
        }

        // Atualizar o job no model, passando o id

        await dataJob.update(updatedJob, jobId);

        response.redirect('/job/' + jobId);

    },

    async jobDeletedById(request, response) {

        const jobId = request.params.id;

        await dataJob.delete(jobId);

        return response.redirect('/');

    }
  }