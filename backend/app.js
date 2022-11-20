require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const cors = require('cors');

const { regexUrl } = require('./utils/constants');
const {
  createUser, login, logout, checkCookie,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { ERROR_CODE500, ERROR_MESSAGE500 } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const notFound = () => {
  throw new NotFoundError();
};

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: 'http://mesto-ger.nomoredomains.icu',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(requestLogger);

app.use(cors(corsOptions));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regexUrl)),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signout', logout);
app.get('/checkCookie', checkCookie);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use(notFound);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODE500;
  const message = statusCode === ERROR_CODE500 ? ERROR_MESSAGE500 : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port  ${PORT}`);
});
