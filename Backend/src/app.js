const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require('../src/routes/auth.routes')

app.use('/school' , authRouter);

module.exports = app;