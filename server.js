const express = require("express");
const cors = require("cors");
const users = require("./handlers/users");
const stats = require("./handlers/stats");
const cors = require("cors");
const verifyUser = require("./middleware/auth");
const handleError = require("./middleware/error");

const PORT = process.env.PORT || 4007;
<<<<<<< HEAD

const server = express();
server.use(express.json());
server.use(cors());

=======
const server = express();
server.use(express.json());
server.use(cors());
>>>>>>> ef17b027584308b168dba9d86e4b5a6a00994aa9
server.post("/register", users.register);
server.get("/scoreboard", stats.get);
server.get("/:user/stats", verifyUser, stats.userStats);
server.post("/:user/stats", verifyUser, stats.post);
server.post("/login", users.login);
<<<<<<< HEAD
// server.use(handleError.handleErrors);
=======
server.use(handleError.handleErrors);
>>>>>>> ef17b027584308b168dba9d86e4b5a6a00994aa9

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
