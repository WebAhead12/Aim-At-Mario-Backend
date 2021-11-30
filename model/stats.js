const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const userModel = require("./users");

function getStats(username) {
  return userModel.getUser(username).then((user) => {
    db.query(`SELECT * FROM stats WHERE user_id=$1 `, [user.id]).then(
      (user) => {
        return user.rows;
      }
    );
  });
}

function highestStats() {
  return db
    .query(
      `SELECT highscore, user_id FROM stats ORDER BY highscore DESC LIMIT 10`
    )
    .then((data) => {
      return data.rows;
    });
}

function createStats(id) {
  const values = [0, 0, 0, id];
  return db
    .query(
      "INSERT INTO stats (hits,misses,highscore, user_id) VALUES($1, $2, $3, $4)",
      values
    )
    .then((stats) => {
      return stats.rows;
    });
}

function updateStats(obj, userId) {
  return db.query(
    `UPDATE stats SET highscore = ${highscore} WHERE user_id = ${userId}`
  );
}

module.exports = {
  getStats,
  highestStats,
  createStats,
  updateStats,
};
