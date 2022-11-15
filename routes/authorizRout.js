const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { registerValid, loginValid } = require('../middlewares/validation');

router.post('/signin', loginValid, login);
router.post('/signup', registerValid, createUser);

module.exports = router;
