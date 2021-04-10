module.exports = {
    remainingDays: (job) => {
      // Prazo em dias

      // To fixed: retorna string

      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

      const dateCreated = new Date(job["createdAt"]);

      // Dia final

      const dueDay = dateCreated.getDate() + Number(remainingDays);

      // Data final ms

      const dueDateMs = dateCreated.setDate(dueDay);

      const differenceMs = dueDateMs - Date.now();

      // 1000 * 60 = s * 60 = h * 24 = d

      const daysMs = 1000 * 60 * 60 * 24;

      const deadline = Math.floor(differenceMs / daysMs);

      return deadline;
    },

    calculateBudget: (job, valueHours) => valueHours * job["total-hours"],
  }

  // Utils: cálculos