const express = require('express')
const authController = require('../Controllers/auth.controller')
const authRouter = express.Router();
const authUser = require('../middlewares/auth.middleware')

/**
 * @route POST/school/register
 * @description Register new user
 * @access Public
 */
authRouter.post("/register" , authController.registerController);

authRouter.post("/login" , authController.loginController);

authRouter.get("/logout" , authController.logoutController);

authRouter.get("/profile" , authUser , authController.profileController);


module.exports = authRouter;