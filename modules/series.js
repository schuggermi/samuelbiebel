const mongoose = require('mongoose');

const SCHEMAseries = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const SERIES = mongoose.model('Series', SCHEMAseries, 'series');

module.exports = SERIES;
