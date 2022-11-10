const ErrorNotFound = require('../errors/NotFound');
const DataIncorrect = require('../errors/DataIncorrect');
const ForbiddenError = require('../errors/ForbiddenError');
const Movies = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movies.create({
    owner: ownerId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      if (!movie) {
        next(new DataIncorrect('Переданы некорректные данные'));
        return;
      }
      res.status(200).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataIncorrect('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id: userId } = req.user;
  Movies.findById(req.params._id)
    .orFail(new ErrorNotFound('Фильм не найден'))
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === userId) {
          movie.delete()
            .then(() => res.status(200).send({ message: 'Фильм удален' }))
            .catch(next);
        } else {
          throw new ForbiddenError('Нельзя удалять чужой фильм');
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataIncorrect({ message: 'Переданы некорректные данные' }));
        return;
      }
      next(err);
    });
};