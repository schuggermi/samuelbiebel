const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

ROUTER.get('/', (req, res) => {
  res.render('index.ejs');
});

ROUTER.get('/ueber-mich', (req, res) => {
  res.render('aboutme.ejs');
});

ROUTER.get('/impressum', (req, res) => {
  res.render('impressum.ejs');
});

module.exports = ROUTER;
