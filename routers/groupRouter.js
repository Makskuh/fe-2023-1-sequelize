const groupRouter = require('express').Router();
const GroupController = require('../controllers/groupController');

groupRouter.post('/', GroupController.createGroup);

module.exports = groupRouter;
