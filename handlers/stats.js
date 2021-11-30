const model = require("../model/stats");

function get(req, res, next) {
  model.highestStats().then((data) => {
    console.log("data", data);
    const response = "hh in";
    res.status(200).send(response);
  });
}

function post(req, res, next) {}

function create(req, res, next) {
  const username = req.body.username;
}
module.exports = { get, post };
