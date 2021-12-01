const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const userModel = require("./users");

function getStats(username) {
  return userModel.getUser(username).then((user) => {
    const id = user[0].id;
    console.log("id", id);
    return db
      .query(`SELECT * FROM stats WHERE user_id=$1 `, [id])
      .then((user) => {
        console.log("rows", user.rows);
        return user.rows;
      });
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
  const { hits, misses, highScore } = obj;
  return db.query(
    `UPDATE stats SET hits = ${hits},misses = ${misses},highscore = ${highScore} WHERE user_id = ${userId}`
  );
}

module.exports = {
  getStats,
  highestStats,
  createStats,
  updateStats,
};
