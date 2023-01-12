const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const userRouter = require("./Routers/userRouter");

app.use(express.json());
app.listen(3000);
app.use(cookieParser());
//base route / router to use
app.use("/user", userRouter);

const planModel = require("./models/planModel");
