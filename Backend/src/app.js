const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);




const authRouter = require('../src/routes/auth.routes')

app.use('/school' , authRouter);

module.exports = app;