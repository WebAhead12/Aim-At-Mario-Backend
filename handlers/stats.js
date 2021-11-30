const model = require("../model/stats");

function get(req, res, next) {
  model.highestStats().then((data) => {
    console.log("data", data);
    const response = "hh in";
    res.status(200).send(response);
  });
}

function post(req, res, next) {
  const id = req.id; //from the header
  const highScore = req.body.highScore;
  model.updateStats(highScore, id).then(() => {
    res.status(200).send("updatedhighscore");
  });
}

module.exports = { get, post };
