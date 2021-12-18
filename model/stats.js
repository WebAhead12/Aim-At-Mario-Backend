const db = require("../database/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const userModel = require("./users");

//gets stats from username
function getStats(username) {
  return userModel.getUser(username).then((user) => {
    const id = user[0].id;
    return db
      .query(`SELECT * FROM stats WHERE user_id=$1 `, [id])
      .then((user) => {
        console.log("rows", user.rows);
        return user.rows;
      });
  });
}
//top 10 highest stats
function highestStats() {
  return db
    .query(
      `SELECT stats.highscore, users.username FROM stats INNER JOIN users ON stats.user_id = users.id ORDER BY highscore DESC LIMIT 10`
    )
    .then((data) => {
      return data.rows;
    });
}
//function that creates defult stats
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
//updates users stats
function updateStats(highscore, userId) {

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
