const express = require('express');
const router =express.Router();
const jwt = require('jsonwebtoken');
const { verificarCredencial } = require('../middleware/login');
const { getUsers, deleteEvento, updateEvento } = require('../consultas/consultas');

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
    try {
        //captura token del headers.
        const token = req.headers.authorization.split(" ")[1];
        //verifica el token con la palabra secreta.
        jwt.verify(token, process.env.SECRET);
        //ejecuta la accion.
        res.json({ message: "ruta Privada" });
        
    } catch (error) {
        res.status(500).json({ message: "acceso NO autorizado" });
    };    
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        await verificarCredencial(email, password);
        const token = jwt.sign({ email }, process.env.SECRET, {expiresIn: "1m"});
        res.json({token});
        
    } catch (error) {
        res.status(500).json({ message: error.message });        
    };
});

router.delete("/evento/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET);
        await deleteEvento(id);
        const { email } = jwt.decode(token);
        res.send(`El usuario ${email} elimino el evento: ${id}`);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.put("/evento/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, fecha, lugar } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET);
        await updateEvento(titulo, descripcion, fecha, lugar, id);
        const { email } = jwt.decode(token);
        res.send(`El usuario ${email} modifico el evento: ${id}`);

    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});


module.exports = router;