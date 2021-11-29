const express = require("express");
const users = require("./handlers/users");

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());

server.post("/", users.register);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
