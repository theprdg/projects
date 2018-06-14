const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const brewMethodSchema = Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  basicApparatus: {
    type: Array,
    required: true
  },
  img: {
    type: String,
    required: true
  }
})

const BrewMethod = mongoose.model('BrewMethod', brewMethodSchema);

module.exports = BrewMethod;