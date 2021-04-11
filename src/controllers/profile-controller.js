const profile = require('../model/profile.js');

module.exports = {
    async updateProfile(request, response) {
      response.render("profile.ejs", { profile: await profile.get() })
    },

    async profileCreate(request, response) {
      
      const dataProfile = request.body;

      const weeksYear = 52;

      const weeksMonth = (weeksYear - dataProfile["vacation-per-year"]) / 12;

      // Horas trabalhadas semana e mês

      const workHoursWeek = dataProfile["days-per-week"] * dataProfile["hours-per-day"];

      const workHoursMonth = workHoursWeek * weeksMonth;

      dataProfile["value-hour"] = dataProfile["monthly-budget"] / workHoursMonth;

      // Atualizar dados

      await profile.update({
        ... await profile.get(),
        ...request.body,
        "value-hour": dataProfile["value-hour"]
      });

      return response.redirect('/profile');
    }
}