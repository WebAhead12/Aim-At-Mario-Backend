const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/users");
const stats = require("../model/stats");
const bcrypt = require("bcryptjs");
dotenv.config();
const SECRET = process.env.JWT_SECRET;

function register(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  model
    .getUser(username)
    .then((find) => {
      console.log(find);

      if (find.length == 0) {
        model
          .createUser(req.body)
          .then((id) => {
            console.log("id", id.rows[0].id);

            const token = jwt.sign({ username: username }, SECRET, {
              expiresIn: "1h",
            });
            const response = {
              username: username,
              access_token: token,
            };

            stats.createStats(id.rows[0].id).then(() => {
              res.status(201).send(response);
            });
          })
          .catch(next);
      } else {
        const response = "taken";
        res.status(401).send(response);
      }
    })
    .catch(next);
}

function login(req, res, next) {
  const user = req.body;
  model.getUser(user.username).then((find) => {
    console.log("find" + find);
    if (find.length == 0) {
      const response = "noUser";
      res.status(401).send(response);
    } else {
      const dbPassword = find[0].password;
      console.log("dbpass = " + dbPassword);
      bcrypt.compare(user.password, dbPassword).then((match) => {
        console.log(match);
        if (!match) throw new Error("Password mismatch");
        const response = "logged in";
        res.status(200).send(response);
      });
    }
  });
}

module.exports = { login, register };
