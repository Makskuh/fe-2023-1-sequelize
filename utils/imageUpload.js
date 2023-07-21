const path = require('path');
const multer = require('multer');
const CONSTANTS = require('../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(CONSTANTS.FILES_PATH, '/images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageUpload = multer({ storage: storage });


module.exports = imageUpload;