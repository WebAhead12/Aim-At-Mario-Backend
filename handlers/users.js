const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/users");
const stats = require("../model/stats");
const bcrypt = require("bcryptjs");
const { database } = require("pg/lib/defaults");
dotenv.config();
const SECRET = process.env.JWT_SECRET;

/// function to register
function register(req, res, next) {
  const username = req.body.username;
  //we search for the user in the data to check if the username is already taken
  model
    .getUser(username)
    .then((find) => {
      if (find.length == 0) {
        //if it returns an empty array then there is no user with that username
        model
          .createUser(req.body) //function to create a user using the username and passowrd
          .then((id) => {
            //we create a token with the username and id
            const token = jwt.sign({ username: username, id: id }, SECRET);
            // sending a response with the username access token and id
            const response = {
              username: username,
              access_token: token,
              id: id.rows[0].id,
            };
            //after creating the user we create its defult stats so we can upate it
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
  //we search for the user
  model.getUser(user.username).then((find) => {
    //if the getUser function returns and empty array there is not user in our dt
    if (find.length == 0) {
      const response = "noUser";
      res.status(401).send(response);
    } else {
      //if it finds it it compares the password in the req.body to the password in the dt
      const dbPassword = find[0].password;
      bcrypt.compare(user.password, dbPassword).then((match) => {
        if (!match) throw new Error("Password mismatch");
        //if it is correct it creates a token
        const token = jwt.sign(
          { username: user.username, id: find[0].id },
          SECRET
        );
        const response = {
          username: username,
          access_token: token,
          id: find[0].id,
        };
        res.status(200).send(response);
      });
    }
  });
}

module.exports = { login, register };
