const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const userRouter = require("./Routers/userRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");

app.use(express.json());
app.listen(3000);
app.use(cookieParser());
//base route / router to use
app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/reviews", reviewRouter);
