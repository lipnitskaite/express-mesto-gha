const express = require('express');
const usersRoutes = express.Router();
const { getUsers, getUserByID, createUser } = require('../controllers/userController');

usersRoutes.get('/', getUsers);

// usersRoutes.get('/:userId', doesUserExist);
usersRoutes.get('/:userId', getUserByID);

usersRoutes.post('/', express.json(), createUser);

// usersRoutes.use(doesUserExist);

exports.usersRoutes = usersRoutes;