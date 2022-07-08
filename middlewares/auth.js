const { checkToken } = require('../helpers/jwt');
const { User } = require('../models/userModel');

const UnauthorizedError = require('../errors/UnauthorizedError');

exports.auth = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;

    if (!jwt) {
      throw new UnauthorizedError('Необходима авторизация');
    };

    let payload;
    payload = checkToken(jwt);

    const authUser = await User.findOne({ _id: payload._id }).select('+password');
    req.user = { _id: authUser._id.toString() };

    next();
  } catch (err) {
    next(err);
  }
};