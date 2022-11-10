require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { registerValid, loginValid } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const notFoundController = require('./controllers/notFoundController');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/movies');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(requestLogger);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValid, login);
app.post('/signup', registerValid, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(notFoundController);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
