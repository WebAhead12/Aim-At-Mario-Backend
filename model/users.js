const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

function createUser(users) {
  console.log(users);
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(users.password, salt))
    .then((hash) => {
      const values = [users.username, hash];
      return db.query(
        "INSERT INTO users(username, password) VALUES($1, $2)",
        values
      );
    });
}

function getUser(username) {
  return db.query(`SELECT * FROM users`).then((user) => {
    const results = user.rows;
    return results.find((element) => element == username);
  });
}

module.exports = {
  createUser,
  getUser,
};
