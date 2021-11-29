const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/users");
dotenv.config();
const SECRET = process.env.JWT_SECRET;

function register(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  model
    .getUser(username)
    .then((find) => {
      if (!find) {
        model
          .createUser(req.body)
          .then(() => {
            const token = jwt.sign({ username: username }, SECRET, {
              expiresIn: "1h",
            });
            const response = {
              username: username,
              access_token: token,
            };
            res.status(201).send(response);
          })
          .catch(next);
      } else {
        const response = "username already taken";
        res.status(401).send(response);
      }
    })
    .catch(next);
}

function login(req, res, next) {}

module.exports = { login, register };
