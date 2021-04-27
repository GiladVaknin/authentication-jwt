const express = require("express");
const api = require("./routes/api");
const users = require("./routes/users");
const options = require("./routes/options");

const app = express();

app.use(express.json());

app.use(options);
app.use("/api/v1", api);
app.use("/users", users);

module.exports = app;
