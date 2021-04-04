const data = {
  name: "Débora",
  avatar:
    "https://media-exp1.licdn.com/dms/image/C4D03AQFvSDG5L4z6BA/profile-displayphoto-shrink_800_800/0/1610104702023?e=1622678400&v=beta&t=jP6j9SPGyZILlMv0PB_tdzPo5AvPnHu9gyr5j0F_lsg",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 8,
  "vacation-per-year": 4,
  "value-hour": 75,
};

module.exports = {
  get: () => {
    return data;
  }
}
