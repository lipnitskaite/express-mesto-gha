const { User } = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch {
    res.status(500).send({ message: 'Произошла ошибка при поиске всех пользователей' });
  }
};

// exports.doesUserExist = (req, res, next) => {
//   if (!users[req.params.userId]) {
//     res.send({ error: 'Такого пользователя нет' });
//     return;
//   };

//   next();
// };

exports.getUserByID = async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);

    res.send(users);
  } catch {
    res.status(500).send({ message: 'Произошла ошибка при поиске пользователя' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.send(newUser);
  } catch {
    res.status(500).send({ message: 'Произошла ошибка при создании пользователя' });
  }
};