const { Card } = require('../models/cardModel');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch {
    res.status(500).send({ message: 'Произошла ошибка при поиске всех карточек' });
  }
};

// exports.createUser = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);

//     res.send(newUser);
//   } catch {
//     res.status(500).send({ message: 'Произошла ошибка при создании пользователя' });
//   }
// };

// module.exports.createCard = (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };

// exports.getUserByID = async (req, res) => {
//   try {
//     const users = await User.findById(req.params.userId);

//     res.send(users);
//   } catch {
//     res.status(500).send({ message: 'Произошла ошибка при поиске пользователя' });
//   }
// };