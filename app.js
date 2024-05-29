const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
app.use(express.json());

app.use(bodyParser.json());

app.use("/api", taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
