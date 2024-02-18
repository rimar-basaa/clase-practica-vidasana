const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
const morgan = require('morgan');

//MMiddleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`servidor corriendo... en puerto:${PORT}`));