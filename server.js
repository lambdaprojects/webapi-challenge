const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Ready, set go! for Sprint Challenge</h2>`);
});

module.exports = server;
