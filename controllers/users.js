const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const DataIncorrect = require('../errors/DataIncorrect');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};


module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new DataIncorrect('Переданы некорректные данные');
    })
    .then((user) => {
      if (!user) {
        throw new DataIncorrect('Переданы некорректные данные');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataIncorrect('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
