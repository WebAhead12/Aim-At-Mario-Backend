const express = require("express");
const users = require("./handlers/users");
const stats = require("./handlers/stats");

const PORT = process.env.PORT || 3001;
const server = express();
server.use(express.json());

server.post("/register", users.register);
server.get("/", stats.get);

server.post("/login", users.login);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
