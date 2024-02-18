const express = require('express');
const router =express.Router();
const { getUsers } = require('../consultas/consultas');

router.get("/", (req, res) => {
    res.send("soy la raiz del servidor");
});

router.get("/users", async (req, res) => {
    try {
        const consulta = await getUsers();
        res.json(consulta);
        
    } catch (error) {
        res.status(500).json({ message: error.message});        
    };
});

module.exports = router;