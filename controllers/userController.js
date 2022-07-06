const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const DuplicateError = require('../errors/DuplicateError');

const validator = require('validator');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

exports.createUser = async (req, res, next) => {
  try {
    const {name, about, avatar, email, password} = req.body;

    if (!email || !password) {
      throw new ValidationError('Укажите email или пароль');
    };

    if (!validator.isEmail(email)) {
      throw new ValidationError('Некорректный формат email');
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
      err = new DuplicateError('Пользователь с таким email уже зарегистрирован');
    };

    next(err);
  }
};

exports.getUsers = async (req, res) => {
  console.log('USER ID: ', req.user._id);

  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.doesUserExist = async (req, res, next) => {
  try {
    if (req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
      const users = await User.findById(req.params.userId);

      if (!users) {
        throw new NotFoundError('Запрашиваемые пользователи не найдены.');
      }
    } else {
      throw new ValidationError('Указан некорректный id пользователя.');
    }
  } catch(err) {
    next(err);
  }

  next();
};

exports.getUserByID = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId);

    res.send(users);
  } catch(err) {
    next(err);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);

    res.send({
      name: currentUser.name,
      about: currentUser.about,
      avatar: currentUser.avatar,
      email: currentUser.email,
      id: currentUser._id,
    });

  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const {name, about} = req.body;

    if (name.length < 2 || name.length > 30) {
      throw new ValidationError('Имя пользователя должно содержать от 2 до 30 символов');
    }

    if (about.length < 2 || about.length > 30) {
      throw new ValidationError('Информация о себе должна содержать от 2 до 30 символов');
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true
      });

    if (!updatedUser) {
      throw new NotFoundError('Запрашиваемые пользователи не найдены.');
    }

    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUserAvatar = async (req, res, next) => {
  try {
    const {avatar} = req.body;

    if (avatar.length < 2) {
      throw new ValidationError('Ссылка на аватар должна содержать не менее 2х символов');
    }

    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      {avatar},
      {
        new: true,
        runValidators: true,
        upsert: true
      });

    if (!updatedUserAvatar) {
      throw new NotFoundError('Запрашиваемые пользователи не найдены.');
    }

    res.send(updatedUserAvatar);
  } catch (err) {
    next(err);
  }
};