const sqlite3 = require("sqlite3");

// Sql.open: connect
const { open } = require("sqlite");

// Open dentro de uma function
module.exports = () =>
  open({
    // File para infos
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
