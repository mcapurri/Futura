const router = require('express').Router();
const User = require('../models/User');
const { uploader, cloudinary } = require('../config/cloudinary');
const passport = require('passport');

// // @desc      Upload image
// // @route     POST /upload
// // @access    Private
router.post(
    '/upload',
    passport.authenticate('jwt', { session: false }),
    uploader.single('avatar'),
    (req, res, next) => {
        console.log('file is: ', req.file);

        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }

        res.json({ secure_url: req.file.path });
    }
);

router.put(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        console.log('req.body', req.body);
        // const {avatar} = req.body
        User.findByIdAndUpdate(req.params.id, {});
    }
);
module.exports = router;
