const pool = require('../db/config');

const getUsers = async () => {
    const res = await pool.query("SELECT * FROM usuarios");
    return res.rows;
};

module.exports = { getUsers };

