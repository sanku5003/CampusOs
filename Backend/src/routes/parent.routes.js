const express = require("express");
const parentRouter = express.Router();
const parentController = require('../controllers/parent.controller')
const authUser = require('../middlewares/auth.middleware');

parentRouter.post('/addParent', authUser, parentController.addParentController);

parentRouter.get('/:student_id/viewParent', authUser, parentController.viewParentController);
parentRouter.put('/:student_id/updateParent', authUser, parentController.updateParentController);
parentRouter.delete('/:student_id/deleteParent', authUser, parentController.deleteParentController);

module.exports = parentRouter;