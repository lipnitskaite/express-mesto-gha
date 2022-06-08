const User = require('../models/user');

exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при поиске всех пользователей' }));
};

// exports.doesUserExist = (req, res, next) => {
//   if (!users[req.params.userId]) {
//     res.send({ error: 'Такого пользователя нет' });
//     return;
//   };

//   next();
// };

exports.getUserByID = (req, res) => {
  User.findById(req.params.userId)
  .then(user => res.send({ data: user}))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при поиске пользователя' }));
};

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании пользователя' }));
};