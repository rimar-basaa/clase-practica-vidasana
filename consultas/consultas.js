const pool = require('../db/config');

const getUsers = async () => {
    const res = await pool.query("SELECT * FROM usuarios");
    return res.rows;
};

const deleteEvento = async (id) => {
    const consulta = "DELETE FROM eventos WHERE id = $1";
    const values = [id]
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
        throw ({ code: 500, message: "Evento NO existe"});
    };
};

const updateEvento = async (titulo, descripcion, fecha, lugar, id) => {
    const consulta = "UPDATE eventos SET titulo = $1, descripcion = $2, fecha = $3, lugar = $4 WHERE id = $5";
    const values = [titulo, descripcion, fecha, lugar, id];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) {
        throw ({ code: 500, message: "Evento NO existe"});
    };
};

module.exports = { getUsers, deleteEvento, updateEvento };

