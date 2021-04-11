const configDb = require('../db/config');

// Model: dados. alteração dos dados através dos métodos

module.exports = {
    async get() { 

        const connectDb = await configDb();

        // All

        const dataDb = await connectDb.all(`SELECT * FROM job`);

        connectDb.close();

        let allJobs = new Array();

        for (job of dataDb) {

            const newData = {
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                "createdAt": job.created_at
            };

            allJobs.push(newData);

        }

        return allJobs;
        
    },

    update: (jobsUpdated) => {
        data = jobsUpdated;
    },

    async delete(jobId) {

        const connectDb = await configDb();

        await connectDb.run(`DELETE FROM job WHERE
        id = ${jobId}
        `);

        await connectDb.close();

    },

    async add(job) {
        const connectDb = await configDb();

        await connectDb.run(`INSERT INTO job (
            name, 
            daily_hours, 
            total_hours, 
            created_at) 
            VALUES 
            ('${job.name}',
            ${job["daily-hours"]},
            ${job["total-hours"]},
            ${job.createdAt}
            )`);

        await connectDb.close();
    }
}


