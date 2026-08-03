const express = require("express");
const studentRouter = express.Router();
const studentController = require("../controllers/student.controller");
const authUser = require("../middlewares/auth.middleware");
studentRouter.post(
  "/addStudent",
  authUser,
  studentController.AddStudentController,
);

module.exports = studentRouter;
