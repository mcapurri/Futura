const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.json('All good in here');
});

// Routes

const auth = require('./auth');
router.use('/auth', auth);

module.exports = router;
