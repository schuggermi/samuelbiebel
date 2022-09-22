const mongoose = require('mongoose');

const SCHEMAevents = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  flyers: {
    type: Array,
    required: true
  },
  finished: {
    type: String,
    required: true
  }
});

const EVENTS = mongoose.model('Events', SCHEMAevents, 'events');

module.exports = EVENTS;
