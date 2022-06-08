const routes = require('express').Router();
const { usersRoutes } = require('./usersRoutes');

routes.use('/users', usersRoutes);

exports.routes = routes;

