const connectDb = require("config");

connectDb();

// Table profile e job, id
// Maiusc
// PK: identificador único. number).

connectDb.exec(`CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly-budget INTEGER,
    days-per-week INTEGER,
    hours-per-week INTEGER,
    vacation-per-day INTEGER,
    value-hour INTEGER
)`);

connectDb.exec(`CREATE TABLE IF NOT EXISTS job (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily-hours INTEGER,
    total-hours INTEGER,
    createdAt DATETIME
)`);

connectDb.close();

