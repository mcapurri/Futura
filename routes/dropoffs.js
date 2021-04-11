const router = require('express').Router();
const { loginCheck } = require('../middlewares/loginCheck');
const DropOff = require('../models/DropOff');

/// @desc     Get all drop-offs
// @route     GET /api/dropoffs
// @access    Private
router.get('/', loginCheck(), async (req, res, next) => {
    const dropOffs = await DropOff.find().populate('createdBy');
    console.log('dropOffs', dropOffs);
    res.status(200).json(dropOffs);
});

/// @desc     Add drop-offs
// @route     POST /api/dropoffs/add
// @access    Private
router.post('/add', async (req, res, next) => {
    const { name, street, city, zipCode, createdBy } = req.body;
    console.log('req.body', req.body);
    try {
        const addDropOff = DropOff.create({
            name,
            street,
            city,
            zipCode,
            createdBy,
        });
        res.status(201).json({ message: 'Drop-off successfully added' });
    } catch (err) {
        res.status(400).json({ message: errorMessage });

        next(err);
    }
});

module.exports = router;
