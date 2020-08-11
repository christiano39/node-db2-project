const express = require('express');
const carsRoutes = require('../cars/carsRouter');

const server = express();

server.use(express.json());
server.use('/api/cars', carsRoutes);

module.exports = server;