const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

const EVENTS = require("../../modules/events.js");

ROUTER.get('/events', (req, res) => {
  res.render('events.ejs');
});

ROUTER.get('/events/api', async (req, res) => {
  const events = await EVENTS.find({});
  await res.send(events);
});

module.exports = ROUTER;
