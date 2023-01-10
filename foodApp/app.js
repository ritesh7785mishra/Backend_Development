const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");

app.use(express.json());
app.listen(3000);
app.use(cookieParser());
//base route / router to use
app.use("/user", userRouter);
app.use("/auth", authRouter);
