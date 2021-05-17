const router = require('express').Router();
const User = require('../models/User');
const { uploader, cloudinary } = require('../config/cloudinary');

// // @desc      Upload image
// // @route     POST /upload
// // @access    Private
router.post(
   '/upload/:id',
   uploader.single('avatar'),
   async (req, res, next) => {
      console.log('file is: ', req.file);
      console.log('req.params.id ', req.params.id);
      if (!req.file) {
         next(new Error('No file uploaded!'));
         return;
      }
      await User.findByIdAndUpdate(req.params.id, { avatar: req.file.path });
      res.json({ secure_url: req.file.path });
   }
);

module.exports = router;
