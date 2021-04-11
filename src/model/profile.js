const configDb = require("../db/config");

module.exports = {
  async get() {
    const connectDb = await configDb();

    // Get: busca um dado (json)

    const dataDb = await connectDb.get(`SELECT * FROM profile`);

    await connectDb.close();

    // Substituir para _ para -

    const newData = {
      name: dataDb.name,
      avatar: dataDb.avatar,
      "monthly-budget": dataDb.monthly_budget,
      "days-per-week": dataDb.days_per_week,
      "hours-per-week": dataDb.hours_per_week,
      "vacation-per-year": dataDb.vacation_per_year,
      "value-hour": dataDb.value_hour,
    };

    return newData;
  },

  // Const não pode ser alterada

  update: (profileData) => {
    data = profileData;
  },
};
