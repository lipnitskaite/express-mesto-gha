const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/userModel');

const validator = require('validator');
const { ERROR_CODE } = require('../errors/ErrorCodes');

const SECRET_KEY = 'very_secret';

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      const err = new Error('Неправильный email или пароль');
      err.statusCode = 401;
      throw err;
    };

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      const err = new Error('Неправильный email или пароль');
      err.statusCode = 401;
      throw err;
    };

    const token = jwt.sign(
      { _id: foundUser._id },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true
      })
      .end();;
  } catch (err) {
    if (err.message === 'Некорректный формат email') {
      res.status(err.statusCode).send({ message: err.message });
      return;
    };
    if (err.message === 'Укажите email или пароль') {
      res.status(err.statusCode).send({ message: err.message });
      return;
    };
    if (err.message === 'Неправильный email или пароль') {
      res.status(err.statusCode).send({ message: err.message });
      return;
    };

    res.status(ERROR_CODE).send({ message: 'Ошибка при авторизации пользователя.' });
  }
};