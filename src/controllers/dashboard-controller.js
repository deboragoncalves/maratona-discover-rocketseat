const dataJob = require('../model/job');
const jobUtils = require('../utils/job-utils');
const profile = require('../model/profile');

module.exports = {

    jobsUpdated(request, response) {

        const jobs = dataJob.get();
        const profiles = profile.get();

        // Map: novo array job

        const updatedJobs = jobs.map((job) => {
            const deadline = jobUtils.remainingDays(job);
            const status = deadline <= 0 ? "done" : "progress";

            const budget = jobUtils.calculateBudget(job, profiles["value-hour"]);

            return {
                ...job,
                deadline,
                status,
                budget,
            };
        });

        return response.render("index.ejs", { jobs: updatedJobs });
    }
}
