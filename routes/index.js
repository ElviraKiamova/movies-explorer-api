const users = require('./users');
const movies = require('./movies');
const authorizRout = require('./authorizRout');
const auth = require('../middlewares/auth');

module.exports = function (app) {
  app.use('/', authorizRout);
  app.use(auth);
  app.use('/users', users);
  app.use('/movies', movies);
};
