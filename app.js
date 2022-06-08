const path = require('path');
const express = require('express');
const mongoose  = require('mongoose');
const { routes } = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(routes);

app.get('/', (req, res) => {
  res.send('Main page is loaded');
});


app.post('/', express.json(), (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});