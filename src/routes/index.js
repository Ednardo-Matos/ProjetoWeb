const express = require('express');
const userRouter = require('./user');
const homeRoutes = require('./home_routes');
const admPanelRoutes = require('./admpanel_routes');


const api = express.Router();
api.use('/users', userRouter);




const route = express.Router();
route.use('/api', api);
route.use('/', homeRoutes);
route.use('/admpanel', admPanelRoutes);


module.exports = route;