const express = require('express');
const usersRoutes = express.Router();
const { getUsers, doesUserExist, getUserByID, updateUser, updateUserAvatar } = require('../controllers/userController');

usersRoutes.get('/', getUsers);

usersRoutes.get('/:userId', doesUserExist);
usersRoutes.get('/:userId', getUserByID);

usersRoutes.patch('/me', express.json(), updateUser);

usersRoutes.patch('/me/avatar', express.json(), updateUserAvatar);

exports.usersRoutes = usersRoutes;