const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/users");
const stats = require("../model/stats");
const bcrypt = require("bcryptjs");

dotenv.config();
const SECRET = process.env.JWT_SECRET;

/// function to register
function register(req, res, next) {
  const username = req.body.username;
  console.log(req.body);

  //we search for the user in the data to check if the username is already taken
  model
    .getUser(username)
    .then((find) => {
      if (find.length == 0) {
        //if it returns an empty array then there is no user with that username
        model
          .createUser(req.body) //function to create a user using the username and passowrd
          .then((id) => {
            // sending a response with the username access token and id
            const response = { status: "nottaken" };
            //after creating the user we create its defult stats so we can upate it
            stats.createStats(id.rows[0].id).then(() => {
              res.status(201).send(response);
            });
          })
          .catch(next);
      } else {
        const response = { status: "taken" };
        res.status(401).send(response);
      }
    })
    .catch(next);
}

function login(req, res, next) {
  const user = req.body;
  //we search for the user
  model
    .getUser(user.username)
    .then((find) => {
      //if the getUser function returns and empty array there is not user in our dt
      if (find.length == 0) {
        const response = { status: "noUser" };
        res.status(401).send(response);
      } else {
        //if it finds it it compares the password in the req.body to the password in the dt
        const dbPassword = find[0].password;
        bcrypt.compare(user.password, dbPassword).then((match) => {
          if (!match) {
            res.send({ status: "wrong password" });
          } else {
            //if it is correct it creates a token
            const token = jwt.sign({ username: user.username, id: find[0].id }, SECRET);
            const response = {
              username: user.username,
              access_token: token,
              status: "",
            };
            res.status(200).send(response);
          }
        });
      }
    })
    .catch(next);
}

module.exports = { login, register };
