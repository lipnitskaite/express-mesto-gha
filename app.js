const express = require('express');
const mongoose  = require('mongoose');
const { routes } = require('./routes/routes');
const { createUser } = require('./controllers/userController');
const { loginUser } = require('./controllers/loginController');

const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.post('/signup', express.json(), createUser);
app.post('/signin', express.json(), loginUser);

app.use(auth);

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main();