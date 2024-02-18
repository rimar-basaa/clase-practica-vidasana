const { Pool } = require('pg');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
});

const getData = async () => {
    const res = await pool.query("SELECT NOW()");
    console.log(res.rows[0]);
    return res.rows;
};

getData();