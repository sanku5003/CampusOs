const express = require("express");
const classRouter = express.Router();
const classController = require("../controllers/class.controller");
const authUser = require("../middlewares/auth.middleware");

classRouter.post("/addClass", authUser, classController.AddClassController);
classRouter.get("/view", authUser, classController.ViewClassesController);
classRouter.get("/view/:class_id", authUser, classController.ViewClassController);
classRouter.put("/update/:class_id", authUser, classController.UpdateClassController);
classRouter.delete("/delete/:class_id", authUser, classController.DeleteClassController);

module.exports = classRouter;
