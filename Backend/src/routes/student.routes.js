const express = require("express");
const studentRouter = express.Router();
const studentController = require("../controllers/student.controller");
const authUser = require("../middlewares/auth.middleware");

studentRouter.post(
  "/addStudent",
  authUser,
  studentController.AddStudentController,
);
studentRouter.get("/view", authUser, studentController.ViewStudentsController);
studentRouter.get("/view/:student_id", authUser, studentController.ViewStudentController);
studentRouter.put("/update/:student_id", authUser, studentController.UpdateStudentController);
studentRouter.delete("/delete/:student_id", authUser, studentController.DeleteStudentController);

module.exports = studentRouter;
