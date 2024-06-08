const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

const indexRoutes = require("./routes");

app.use("/api/v1", indexRoutes);

module.exports = app;