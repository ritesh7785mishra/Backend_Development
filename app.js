const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(3000);
app.get("/", function (req, res) {
  res.sendFile(
    "/Users/Ritesh/Documents/backend project/task-manager-backend/views/index.html"
  );
});

app.get("/about", function (req, res) {
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

const db_link =
  "mongodb+srv://admin:XdE8RNtOJ43zIWy1@cluster0.q1orxes.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(db);
    console.log("data base connected");
  })
  .catch((err) => {
    console.log("error");
  });
