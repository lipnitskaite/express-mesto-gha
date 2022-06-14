const express = require('express');
const usersRoutes = express.Router();
const { getUsers, getUserByID, createUser, updateUser } = require('../controllers/userController');

usersRoutes.get('/', getUsers);

// usersRoutes.get('/:userId', doesUserExist);
usersRoutes.get('/:userId', getUserByID);

usersRoutes.post('/', express.json(), createUser);

// usersRoutes.use(doesUserExist);

usersRoutes.patch('/me', express.json(), updateUser);

exports.usersRoutes = usersRoutes;