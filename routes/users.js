const router = require('express').Router();
const {
  userValid,
} = require('../middlewares/validation');

const {
  updateUserInfo,
  getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', userValid, updateUserInfo);

module.exports = router;
