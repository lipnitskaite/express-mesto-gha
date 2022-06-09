const routes = require('express').Router();
const { usersRoutes } = require('./usersRoutes');
const { cardsRoutes } = require('./cardsRoutes');

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

exports.routes = routes;

