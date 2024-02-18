const pool = require('../db/config');

const getConsultas = async () => {
    const consulta = "SELECT * FROM eventos";
    const res = await pool.query(consulta);
    return res.rows;
};

module.exports = { getConsultas };

