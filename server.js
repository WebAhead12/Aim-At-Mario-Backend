const cors = require("cors");

const express = require("express");
const users = require("./handlers/users");
const stats = require("./handlers/stats");
const verifyUser = require("./middleware/auth");
const handleError = require("./middleware/error");

const PORT = process.env.PORT || 4007;
const server = express();
server.use(cors());

server.use(express.json());

server.post("/register", users.register);
server.get("/scoreboard", stats.get);
server.get("/stats", verifyUser, stats.userStats);
server.post("/stats", verifyUser, stats.post);
server.post("/login", users.login);
server.use(handleError.handleErrors);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
