let data = [
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
]

// Model: dados. alteração dos dados através dos métodos

module.exports = {
    get: () => { 
        return data 
    },

    update: (jobsUpdated) => {
        data = jobsUpdated;
    },

    delete: (jobId) => {
        data = data.filter(job => Number(job.id) !== Number(jobId));
    },

    add: (job) => {
        data.push(job);
    }
}


