const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "campusOs_DB",
    password: "Sanku0512@",
    port: 5432,
});

module.exports = pool;