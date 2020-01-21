const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const carsRouter = require('./routers/carsRouter');

const server = express();
server.use(cors());
server.use(helmet('dev'));
server.use(express.json());

server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
    res.status(200).send(`<h1>Server is running, check /api/cars</h1>`);
});

module.exports = server;