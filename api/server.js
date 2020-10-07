const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const errHandler = require("./errorHandler.js");

const usersRouter = require("./routers/usersRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use(errHandler);

module.exports = server;
