const { User } = require('../models/userModel');

// const ValidationError = require('../errors/ValidationError');
// const NotFoundError = require('../errors/NotFoundError');

const VALIDATION_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const ERROR_CODE = 500;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемые пользователи не найдены.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при отображении пользователей.' });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);

    res.send(users);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при отображении пользователя.' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при создании пользователя.' });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body);

    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
    if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при обновлении профиля.' });
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  try {
    const updatedUserAvatar = await User.findByIdAndUpdate(req.user._id, req.body);

    res.send(updatedUserAvatar);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
    if (err.name === 'ValidationError') return res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
    if (err.name === 'Error') return res.status(ERROR_CODE).send({ message: 'Ошибка при обновлении аватара.' });
  }
};