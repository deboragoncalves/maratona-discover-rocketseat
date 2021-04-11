const dataJob = require('../model/job');
const jobUtils = require('../utils/job-utils');
const profile = require('../model/profile');

module.exports = {

     async jobsUpdated(request, response) {

        const jobs = dataJob.get();

        // Get lá no profile é aysnc, tem awaits
        // Quando chama tb deve ter awaits, para terminar tudo 
        // jobsUpdate é aysnc
        const profiles = await profile.get();

        let statusJobs = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let hoursJobsProgress = 0;

        // Map: novo array job

        const updatedJobs = jobs.map((job) => {
            const deadline = jobUtils.remainingDays(job);
            const status = deadline <= 0 ? "done" : "progress";

            // Status: done ou progress++
            
            statusJobs[status] += 1;

            status == "progress" ? hoursJobsProgress += Number(job["daily-hours"]) : hoursJobsProgress;

            const budget = jobUtils.calculateBudget(job, profiles["value-hour"]);

            return {
                ...job,
                deadline,
                status,
                budget,
            };
        });

        // Total horas por dia - horas jobs progress

        const freeHours = profiles["hours-per-day"] - hoursJobsProgress;

        return response.render("index.ejs", { jobs: updatedJobs, profile: profiles, statusJobs: statusJobs, freeHours: freeHours });
    }
}

// Controller: envia data para view