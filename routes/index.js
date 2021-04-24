const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.json('All good in here');
});

// Routes

const auth = require('./auth');
router.use('/auth', auth);

const users = require('./users');
router.use('/users', passport.authenticate('jwt', { session: false }), users);

const dropoffs = require('./dropoffs');
router.use(
    '/dropoffs',
    passport.authenticate('jwt', { session: false }),
    dropoffs
);

module.exports = router;
