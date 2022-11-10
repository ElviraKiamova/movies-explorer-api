const router = require('express').Router();
const {
  createMovieValid,
  parameterIdValid,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValid, createMovie);
router.delete('/:_id', parameterIdValid('_id'), deleteMovie);

module.exports = router;
