const model = require("../model/stats");

function get(req, res, next) {
  //highscore
  model.highestStats().then((data) => {
    console.log("data", data);
    const response = "hh in";
    res.status(200).send(response);
  });
}

function post(req, res, next) {
  //post new stats
  const id = req.id; //from the header
  const obj = req.body;
  model.updateStats(obj, id).then(() => {
    res.status(200).send("updatedhighscore");
  });
}

function userStats(req, res, next) {
  const username = req.body.username;
  model.getStats(username).then((stats) => {
    console.log("stats", stats);
    res.status(200).send(stats[0]);
  });
}

module.exports = { get, post, userStats };
