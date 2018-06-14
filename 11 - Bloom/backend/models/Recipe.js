const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const recipeSchema = Schema({
  recipeName: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  brewMethod_id: { //FROM BREWMETHOD COLLECTION
    type: String,
    required: true
  },
  brewTime: { //SECONDS
    type: Number, 
    required: true
  },
  servingSize: { //CUPS
    type: Number,
    required: true
  },
  coffeeWeight: { //GRAMS
    type: Number,
    required: true
  },
  coarseness: {
    type: String,
    required: true
  },
  waterVol: { //MILLILITRE
    type: String || Number,
    required: true
  },
  temperature: { //FAHRENHEIT
    type: String || Number,
    required: true
  },
  recipe: {
    type: Array,
    required: true
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;