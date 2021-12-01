const model = require("../model/stats");

function get(req, res, next) {
  //gets top 10 highscores
  model.highestStats().then((data) => {
    res.status(200).send(data);
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
  //stats of specified user
  const username = req.body.username;
  model.getStats(username).then((stats) => {
    res.status(200).send(stats[0]);
  });
}

module.exports = { get, post, userStats };
