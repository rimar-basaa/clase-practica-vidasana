const express = require('express');
const router =express.Router();
const jwt = require('jsonwebtoken');
const { verificarCredencial } = require('../middleware/login');
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

router.get("/token", async (req, res) => {
    const token = null;
    res.json({ token });
});

router.get("/public", async (req, res) => {
    res.json({ message: "ruta Publica" });
});

router.get("/private", async (req, res) => {
    res.json({ message: "ruta Privada" });
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        await verificarCredencial(email, password);
        const token = jwt.sign({ email }, process.env.SECRET, {expiresIn: "1m"});
        res.json({token});
        
    } catch (error) {
        res.status(500),
        res.json({ message: error.message });        
    };
});


module.exports = router;