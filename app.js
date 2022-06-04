const path = require('path');
const express = require('express');
const mongoose  = require('mongoose');
const user = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', user);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});