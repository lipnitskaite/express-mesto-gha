const User = require('../models/user');

module.exports.findAllUsers = (req, res, next) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.doesUserExist = (req, res, next) => {
  if (!users[req.params.userId]) {
    res.send({ error: 'Такого пользователя нет' });
    return;
  };

  next();
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => res.send({ data: user}))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};