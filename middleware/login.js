const pool = require('../db/config');

const verificarCredencial = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 and password = $2";
    const values = [email, password];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
        throw ({ code: 500, message: "Credencial Invalida"});
    };
};

module.exports = { verificarCredencial };