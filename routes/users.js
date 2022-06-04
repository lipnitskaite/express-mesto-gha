const User = require('../models/user');
const user = require('express').Router();

const doesUserExist = (req, res, next) => {
  if (!users[req.params.userId]) {
    res.send({ error: 'Такого пользователя нет' });
    return;
  };

  next();
};

const sendUser = (req, res, next) => {
  res.send(users[req.params.userId]);
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

user.get('/users', (req, res) => {
  res.send(); //вернуть всех пользователей
});

user.get('/users/:userId', doesUserExist);
user.get('/users/:userId', sendUser);

// Создать пользователя
user.post('/users', createUser);

user.use(doesUserExist);

module.exports = user;