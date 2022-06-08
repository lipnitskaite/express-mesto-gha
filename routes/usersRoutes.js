const express = require('express');
const usersRoutes = express.Router();
const { findAllUsers, findUser, createUser } = require('../controllers/userController');

usersRoutes.get('/', findAllUsers);

// usersRoutes.get('/:userId', doesUserExist);
usersRoutes.get('/:userId', findUser);

usersRoutes.post('/', express.json(), createUser);

// usersRoutes.use(doesUserExist);

exports.usersRoutes = usersRoutes;