const express = require("express");
const app = express();

const morgan = require("morgan");
const tourRouter = require("./routes/api/tours");

//App configuration
app.use(express.json());
app.use(morgan("dev"));

//Importing routes
app.use("/api/v1/tours", tourRouter);

module.exports = app;
