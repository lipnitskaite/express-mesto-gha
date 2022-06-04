const userRouter = require('express').Router();
const { findAllUsers, doesUserExist, findUser, createUser } = require('../controllers/users');
const User = require('../models/user');

userRouter.get('/users', findAllUsers);

userRouter.get('/users/:userId', doesUserExist);
userRouter.get('/users/:userId', findUser);

userRouter.post('/users', createUser);

userRouter.use(doesUserExist);

module.exports = userRouter;