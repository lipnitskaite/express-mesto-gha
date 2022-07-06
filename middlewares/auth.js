const { checkToken } = require('../helpers/jwt');
const { User } = require('../models/userModel');

exports.auth = async (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  };

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = checkToken(token);

    const authUser = await User.findOne({ _id: payload._id }).select('+password');

    if (!authUser) {
      const err = new Error('Необходима авторизация');
      err.statusCode = 401;
      throw err;
    }

    req.user = { _id: authUser._id.toString() };

    next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
};