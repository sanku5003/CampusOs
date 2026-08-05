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




const authRouter = require('../src/routes/auth.routes');
const studentRouter = require('../src/routes/student.routes');


app.use('/school' , authRouter);
app.use('/school/student' , studentRouter)


module.exports = app;