const users = require('./users');
const movies = require('./movies');
const authorizRout = require('./authorizRout');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const { errorMessages } = require('../utils/constants');

module.exports = function (app) {
  app.use('/', authorizRout);
  app.use(auth);
  app.use('/users', users);
  app.use('/movies', movies);

  app.all('*', (req, res, next) => {
    next(new NotFound(errorMessages.nonExistentAddress));
  });
};
