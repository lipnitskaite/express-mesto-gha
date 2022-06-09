const express = require('express');
// const path = require('path');
const mongoose  = require('mongoose');
const { routes } = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(routes);

app.use((req, res, next) => {
  req.user = {
    _id: '62a0afc88415c6b3228d7227',
  };

  next();
})

app.get('/', (req, res) => {
  res.send('Main page is loaded');
});


app.post('/', express.json(), (req, res) => {
  res.send(req.body);
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  // await mongoose.connect('mongodb://localhost:27017/mestodb', {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false
  // });

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main();