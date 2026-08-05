const express = require("express");
const parentRouter = express.Router();
const parentController = require('../controllers/parent.controller')
const authUser = require('../middlewares/auth.middleware');

parentRouter.post ('/addParent' , authUser , parentController.addParentController);

parentRouter.get ('/:student_id/viewParent' , authUser , parentController.viewParentController);

module.exports = parentRouter;