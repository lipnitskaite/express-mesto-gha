const express = require('express');
const mongoose  = require('mongoose');
const { routes } = require('./routes/routes');
const { createUser } = require('./controllers/userController');
const { loginUser } = require('./controllers/loginController');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '62a0afcf8415c6b3228d7229',
  };

  next();
});

app.post('/signup', express.json(), createUser);
app.post('/signin', express.json(), loginUser);

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main();