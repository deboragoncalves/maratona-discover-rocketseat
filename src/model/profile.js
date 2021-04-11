const configDb = require("../db/config");

module.exports = {
  async get() {
    const connectDb = await configDb();

    // Get: busca um dado (json)

    const dataDb = await connectDb.get(`SELECT * FROM profile`);

    await connectDb.close();

    // Substituir _ para -

    const newData = {
      name: dataDb.name,
      avatar: dataDb.avatar,
      "monthly-budget": dataDb.monthly_budget,
      "days-per-week": dataDb.days_per_week,
      "hours-per-day": dataDb.hours_per_day,
      "vacation-per-year": dataDb.vacation_per_year,
      "value-hour": dataDb.value_hour,
    };

    return newData;
  },

  // Const não pode ser alterada

  async update(profileData) {

    const connectDb = await configDb();

    // Template String ${}

    await connectDb.run(`UPDATE profile SET
    name = '${profileData.name}',
    avatar = '${profileData.avatar}',
    monthly_budget = ${profileData["monthly-budget"]},
    days_per_week = ${profileData["days-per-week"]},
    hours_per_day = ${profileData["hours-per-day"]},
    vacation_per_year = ${profileData["vacation-per-year"]},
    value_hour = ${profileData["value-hour"]}`)

    await connectDb.close();
    
  },
};
