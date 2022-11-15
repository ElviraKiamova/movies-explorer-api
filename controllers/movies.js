const ErrorNotFound = require('../errors/NotFound');
const DataIncorrect = require('../errors/DataIncorrect');
const ForbiddenError = require('../errors/ForbiddenError');
const Movies = require('../models/movie');
const { errorMessages } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const { _id: userId } = req.user;
  Movies.find({ owner: userId })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  Movies.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataIncorrect(errorMessages.createMovie));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id: userId } = req.user;
  Movies.findById(req.params._id)
    .orFail(new ErrorNotFound(errorMessages.movieNotFound))
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === userId) {
          movie.delete()
            .then(() => res.status(200).send({ message: errorMessages.movieDeleted }))
            .catch(next);
        } else {
          throw new ForbiddenError(errorMessages.deleteSomeone);
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect(errorMessages.deleteMovie));
        return;
      }
      next(err);
    });
};
