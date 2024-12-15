require('dotenv').config();

module.exports = {
    development: {
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        dialect: 'postgres',
        port: process.env.PGPORT,
    },
    // You can add other environments like production, test, etc.
};
