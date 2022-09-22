const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

const SERIES = require('../../modules/series.js')
const MEDICATIONANDADDICTION = require("../../modules/medicationandaddictionModule.js");

ROUTER.get('/galerie', (req, res) => {
  res.render('galery.ejs');
});

ROUTER.get('/galerie/api', async (req, res) => {
  const series = await SERIES.find({});
  await res.send(series);
});

ROUTER.get('/galerie/medicationandaddiction', async (req, res) => {
  await res.render('galery/medicationandaddiction.ejs');
});

ROUTER.get('/galerie/medicationandaddiction/api', async (req, res) => {
  const pictures = await MEDICATIONANDADDICTION.find({});
  res.send(pictures);
});

module.exports = ROUTER;
