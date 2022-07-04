const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');

const validator = require('validator');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

const { VALIDATION_ERROR_CODE } = require('../errors/ErrorCodes');
const { NOT_FOUND_ERROR_CODE } = require('../errors/ErrorCodes');
const { ERROR_CODE } = require('../errors/ErrorCodes');

exports.createUser = async (req, res) => {
  try {
    const {name, about, avatar, email, password} = req.body;

    if (!validator.isEmail(email)) {
      const err = new Error('Некорректный формат email');
      err.statusCode = 400;
      throw err;
    };

    if (!email || !password) {
      const err = new Error('Укажите email или пароль');
      err.statusCode = 400;
      throw err;
    };

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({ name, about, avatar, email, password: hash });

    res.send({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован' });
      return;
    };
    if (err.message === 'Некорректный формат email') {
      res.status(err.statusCode).send({ message: err.message });
      return;
    };
    if (err.message === 'Укажите email или пароль') {
      res.status(err.statusCode).send({ message: err.message });
      return;
    };

    res.status(ERROR_CODE).send({ message: 'Ошибка при создании пользователя.' });
  }
};

exports.getUsers = async (req, res) => {
  console.log('USER ID: ', req.user._id);

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
    res.status(VALIDATION_ERROR_CODE).send({ message: 'Указан некорректный id пользователя.' });
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

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      });

    res.send(updatedUser);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
        break;
      default:
        res.status(ERROR_CODE).send({ message: 'Ошибка при обновлении профиля.' });
    }
  }
};

exports.updateUserAvatar = async (req, res) => {
  try {
    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      {avatar: req.body.avatar},
      {
        new: true,
        runValidators: true,
        upsert: true
      });

    res.send(updatedUserAvatar);
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        break;
      case 'NotFoundError':
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден.' });
        break;
      default:
        res.status(ERROR_CODE).send({ message: 'Ошибка при обновлении аватара.' });
    }
  }
};