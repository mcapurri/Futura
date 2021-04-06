const router = require('express').Router();
const User = require('../models/User');
const { uploader, cloudinary } = require('../config/cloudinary');

// // @desc      Upload image
// // @route     POST /upload
// // @access    Private
router.post('/upload', uploader.single('avatar'), (req, res, next) => {
    console.log('file is: ', req.file);

    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend

    res.json({ secure_url: req.file.path });
});

router.put('/users/:id', (req, res, next) => {
    console.log('req.body', req.body);
    // const {avatar} = req.body
    User.findByIdAndUpdate(req.params.id, {});
});
module.exports = router;
