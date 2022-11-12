require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const notFoundController = require('./controllers/notFoundController');
const errorHandler = require('./middlewares/errorHandler');
const corsProcessing = require('./middlewares/corsProcessin');
const routes = require('./routes');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(corsProcessing);

app.use(requestLogger);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes(app);

app.use(notFoundController);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
