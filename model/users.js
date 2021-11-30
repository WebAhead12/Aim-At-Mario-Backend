const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

function createUser(users) {
  console.log("USERS CREATE", users);
  return bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(users.password, salt))
    .then((hash) => {
      const values = [users.username, hash];
      return db.query(
        "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id",
        values
      );
    });
}

function getUser(username) {
  return db
    .query(`SELECT * FROM users WHERE username=$1 `, [username])
    .then((user) => {
      return user.rows;
    });
}

module.exports = {
  createUser,
  getUser,
};
