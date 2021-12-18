const model = require("../model/stats");
const modeluser = require("../model/users");

function get(req, res, next) {
  //gets top 10 highscores
  model
    .highestStats()
    .then((data) => {
      console.log("iddata",data )
      res.status(200).send(data);
      
    })
    .catch(next);
}

function post(req, res, next) {
  //post new stats
  const id = req.id; //from the header
  console.log(req.body, "reqbody");
  model
    .updateStats(req.body.highscore, id)
    .then(() => {
      res.status(200).send({res: "updatedhighscore"});
    })
    .catch(next);
}

function userStats(req, res, next) {
  //stats of specified user
  const username = req.username;
  model
    .getStats(username)
    .then((stats) => {
      res.status(200).send(stats[0]);
    })
    .catch(next);
}

module.exports = { get, post, userStats };
