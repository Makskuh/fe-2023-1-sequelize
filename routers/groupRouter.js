const groupRouter = require('express').Router();
const path = require('path');
const multer = require('multer');
const GroupController = require('../controllers/groupController');
const CONSTANTS = require('../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(CONSTANTS.FILES_PATH, '/images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

groupRouter.post('/', GroupController.createGroup);
groupRouter.post(
  '/:groupId/images',
  upload.single('image'),
  GroupController.addImageToGroup
);

module.exports = groupRouter;
