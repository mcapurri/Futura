const router = require('express').Router();
const passport = require('passport');

// Routes

const auth = require('./auth');
router.use('/auth', auth);

const users = require('./users');
router.use('/users', users);

const dropoffs = require('./dropoffs');
router.use('/dropoffs', dropoffs);

const deposits = require('./deposits');
router.use('/deposits', deposits);

// router.get('/', (req, res, next) => {
//     res.json('Happy coding!');
// });

module.exports = router;
