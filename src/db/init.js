const configDb = require("./config");

// Aysnc: existem awaits

const initDb = {
    async init() {

        // await: espera algo terminar de ser executado para executar o próximo cmd. deve ser usado junto com async

        const connectDb = await configDb();

        // Table profile e job, id
        // Maiusc
        // PK: identificador único. number).

        // Exec manda a info pro driver que manda para o arquivo do db

        await connectDb.exec(`CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            avatar TEXT NOT NULL,
            monthly_budget INTEGER NOT NULL,
            days_per_week INTEGER NOT NULL,
            hours_per_week INTEGER NOT NULL,
            vacation_per_day INTEGER NOT NULL,
            value_hour INTEGER NOT NULL
        )`);

        await connectDb.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_week,
            vacation_per_day,
            value_hour
        ) VALUES (
            'Débora',
            'https://media-exp1.licdn.com/dms/image/C4D03AQFvSDG5L4z6BA/profile-displayphoto-shrink_800_800/0/1610104702023?e=1622678400&v=beta&t=jP6j9SPGyZILlMv0PB_tdzPo5AvPnHu9gyr5j0F_lsg',
            3000,
            5,
            8,
            4,
            75
        )`);

        await connectDb.exec(`CREATE TABLE IF NOT EXISTS job (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            daily_hours INTEGER NOT NULL,
            total_hours INTEGER NOT NULL,
            created_at DATETIME NOT NULL
        )`);

        await connectDb.run(`INSERT INTO job (
            name, 
            daily_hours, 
            total_hours, 
            created_at) 
            VALUES 
            ('Pizzaria Guloso',
            2,
            60,
            1618156954130
        )`);

        await connectDb.run(`INSERT INTO job (
            name, 
            daily_hours, 
            total_hours, 
            created_at) 
            VALUES 
            ('OneTwo Project',
            3,
            47,
            1618156954130
        )`);

        await connectDb.close();

    }
}

initDb.init();