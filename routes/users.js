const User = require('../models/user');
const user = require('express').Router();

const doesUserExist = (req, res, next) => {
  if (!users[req.params.userId]) {
    res.send({ error: 'Такого пользователя нет' });
    return;
  };

  next();
};

const findAllUsers = (req, res, next) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const findUser = (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => res.send({ data: user}))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

user.get('/users', findAllUsers);

user.get('/users/:userId', doesUserExist);
user.get('/users/:userId', findUser);

user.post('/users', createUser);

user.use(doesUserExist);

module.exports = user;