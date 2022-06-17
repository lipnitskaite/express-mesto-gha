const { User } = require('../models/userModel');

const { VALIDATION_ERROR_CODE } = require('../errors/ErrorCodes');
const { NOT_FOUND_ERROR_CODE } = require('../errors/ErrorCodes');
const { ERROR_CODE } = require('../errors/ErrorCodes');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемые пользователи не найдены.' });
      return;
    };

    res.status(ERROR_CODE).send({ message: 'Ошибка при отображении пользователей.' });
  }
};

exports.doesUserExist = async (req, res, next) => {
  if (req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const users = await User.findById(req.params.userId);

    if (!users) {
      res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
      return;
    }
  } else {
    res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при поиске пользователя.' });
    return;
  }

  next();
};

exports.getUserByID = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId);

    res.send(users);
  } catch {
    res.status(ERROR_CODE).send({ message: 'Ошибка при отображении пользователя.' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      return;
    };

    res.status(ERROR_CODE).send({ message: 'Ошибка при создании пользователя.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
        upsert: true
      });

    res.send(updatedUser);
  } catch (err) {
    switch (err.name) {
      case 'NotFoundError':
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
        break;
      case 'ValidationError':
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        break;
      default:
        res.status(ERROR_CODE).send({ message: 'Ошибка при обновлении профиля.' });
    }
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  try {
    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true,
        upsert: true
      });

    res.send(updatedUserAvatar);
  } catch (err) {
    switch (err.name) {
      case 'NotFoundError':
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
        break;
      case 'ValidationError':
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        break;
      default:
        res.status(ERROR_CODE).send({ message: 'Ошибка при обновлении аватара.' });
    }
  }
};