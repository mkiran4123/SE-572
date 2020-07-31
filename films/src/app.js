const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require('cors');

const Film = require("./models/film_model");


app.use(bodyparser.json());
app.use(cors());


app.get("/", (req, res) => {
  res.json({msg : "films"});
});

app.get("/api/v1/films", async(req, res) => {
  const films = await Film.find({});
  res.json(films);
});

app.post("/api/v1/films", async(req, res) =>{
  const film = new Film({name : req.body.name, rating : req.body.rating});
  const saveFilm = await film.save();
  res.json(saveFilm);
});

module.exports = app;
