const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');
const { generateToken } = require('../helpers/jwt');

const ValidationError = require('../errors/ValidationError');
const UnauthorizedError = require('../errors/UnauthorizedError');

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Укажите email или пароль');
    };

    const foundUser = await User.findOne({ email }).select('+password');

    if (!foundUser) {
      throw new UnauthorizedError('Неправильный email или пароль');
    };

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Неправильный email или пароль');
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
    next(err);
  }
};