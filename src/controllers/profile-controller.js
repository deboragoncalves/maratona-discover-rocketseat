const profile = require('../model/profile.js');

module.exports = {
    updateProfile: (request, response) => response.render("profile.ejs", { profile: profile.get() }),

    profileCreate: (request, response) => {
      
      const dataProfile = request.body;

      const weeksYear = 52;

      const weeksMonth = (weeksYear - dataProfile["vacation-per-year"]) / 12;

      // Horas trabalhadas semana e mês

      const workHoursWeek = dataProfile["days-per-week"] * dataProfile["hours-per-day"];

      const workHoursMonth = workHoursWeek * weeksMonth;

      dataProfile["value-hour"] = dataProfile["monthly-budget"] / workHoursMonth;

      // Atualizar data

      profile.get() = dataProfile;

      return response.redirect('/profile');
    }
}