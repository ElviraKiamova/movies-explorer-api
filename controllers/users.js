const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const DataIncorrect = require('../errors/DataIncorrect');
const RegistrationError = require('../errors/RegistrationError');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        throw new NotFound(errorMessages.userNotFound);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect(errorMessages.findUser));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(200).send({
        data: {
          name,
          email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataIncorrect(errorMessages.createUser));
      } else if (err.code === 11000) {
        next(new RegistrationError(errorMessages.createUserUps));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  const findAndUpdate = () => User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true },
  );

  User.find({ email })
    .then(([user]) => {
      if (user && user._id.toString() !== req.user._id) {
        throw new RegistrationError(errorMessages.updateUser);
      }
      return findAndUpdate();
    })
    .then(() => {
      res.send({ name, email });
    })
    .catch(next);
};
