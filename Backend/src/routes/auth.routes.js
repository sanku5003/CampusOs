const express = require('express')
const authController = require('../Controllers/auth.controller')
const authRouter = express.Router();


/**
 * @route POST/school/register
 * @description Register new user
 * @access Public
 */
authRouter.post("/register" , authController.registerController);

authRouter.post("/login" , authController.loginController);


module.exports = authRouter;