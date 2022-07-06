const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');
const { generateToken } = require('../helpers/jwt');

const validator = require('validator');
const { ERROR_CODE } = require('../errors/ErrorCodes');

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

    const token = generateToken({ _id: foundUser._id });

    console.log('userToken: ', token);
    console.log('userID: ', foundUser._id.toString());

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true
      })
      .end();
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