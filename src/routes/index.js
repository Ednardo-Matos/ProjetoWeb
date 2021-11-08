const express = require('express');
const userRouter = require('./user');

const api = express.Router();
api.use('/users', userRouter);




const route = express.Router();
route.use('/api', api);

module.exports = route;