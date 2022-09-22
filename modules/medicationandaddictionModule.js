const mongoose = require('mongoose');

const SCHEMAmedicationandaddiction = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pills: {
    type: Number,
    required: true,
    min: 0
  },
  height: {
    type: Number,
    required: true,
    min: 0
  },
  width: {
    type: Number,
    required: true,
    min: 0
  },
  length: {
    type: Number,
    required: false,
    min: 0
  },
  publisher: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  cite: {
    type: String,
    required: true
  },
  sold: {
    type: Boolean,
    required: true
  }
});

const MEDICATIONANDADDICTION = mongoose.model('Medicationandaddiction', SCHEMAmedicationandaddiction, 'medicationandaddiction');

module.exports = MEDICATIONANDADDICTION;
