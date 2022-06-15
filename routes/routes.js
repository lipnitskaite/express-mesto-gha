const routes = require('express').Router();
const { usersRoutes } = require('./usersRoutes');
const { cardsRoutes } = require('./cardsRoutes');

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

routes.all('*', (req, res) => {
  res.status(404).send({message: 'Not Found'});
});

exports.routes = routes;

