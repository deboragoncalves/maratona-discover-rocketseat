const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
    name: "Débora",
    avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQFvSDG5L4z6BA/profile-displayphoto-shrink_800_800/0/1610104702023?e=1622678400&v=beta&t=jP6j9SPGyZILlMv0PB_tdzPo5AvPnHu9gyr5j0F_lsg",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4
}

const jobs = new Array();

jobs.push({
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    createdAt: Date.now()
});

jobs.push({
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    createdAt: Date.now()
});

routes.get("", (request, response) => response.render(views + "index.ejs", { jobs: jobs }));
routes.get("/job", (request, response) => response.render(views + "job.ejs"));
routes.post("/job", (request, response) => { 

    // Request body: dados do form. { name: 'Debora', ... }

    const job = request.body;

    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId++,
        name: job.name,
        "daily-hours": job["daily-hours"],
        "total-hours": job["total-hours"],
        createdAt: Date.now()
    }); 

    // Date now: milissegundos desde 1970 

    return response.redirect('/');
});
routes.get("/job/edit", (request, response) => response.render(views + "job-edit.ejs"));
routes.get("/profile", (request, response) => response.render(views + "profile.ejs", { profile: profile }));

module.exports = routes;