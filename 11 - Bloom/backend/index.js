const mongoose = require('mongoose'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//SETUP MONGOOSE CONNECTION
mongoose.connect('mongodb://localhost/bloom');

//USE GLOBAL PROMISE LIBRARY
mongoose.Promise = global.Promise;

const db = mongoose.connection;

//CONNECTION VERIFICATION
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongoDB');
});

const BrewMethod = require('./models/BrewMethod');
const Recipe = require('./models/Recipe');

//GET ALL BREW METHODS
app.get('/method', (req, res) => {
  BrewMethod.find({})
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

//GET ALL RECIPES
app.get('/recipe', (req, res) => {
  Recipe.find({})
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

//GET SPECIFIC RECIPE
app.get('/recipe/:recipe_id', (req, res) => {
  Recipe.findById(req.params.recipe_id)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

//************ADD BREW METHOD************//
// BrewMethod({
//   name: "Chemex",
//   description: "A permanent fixture in New York City's MOMA collection, the Chemex is both a marvel of science and design created in 1941 by German chemist Dr. Peter Schlumbohm.",
//   basicApparatus: [
//     '6 or 8-cup Chemex',
//     'Chemex Filter',
//     'Scale',
//     'Stir stick'
//   ]
// }).save()
//   .then(savedBrewMeth => {
//     console.log(savedBrewMeth);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//************ADD RECIPE************//
// Recipe({
//   recipeName: "Award 3",
//   overview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?",
//   brewMethod_id: "5b105b9eab61b5d1ce92708b",
//   brewTime: 220,
//   servingSize: 2,
//   coffeeWeight: 42,
//   coarseness: 'Medium',
//   waterVol: '650-700',
//   temperature: '195-205',
//   recipe: [
//     {
//       step_title: "Setup and rinse",
//       instruction: "Place the Chemex filter in the brewer with the single-layered side of the filter away from the spout. Rinse the filter with hot water to remove some of the filter taste and preheat the glass. Discard the rinse water.",
//       time: 0
//     },
//     {
//       step_title: "Add the grind",
//       instruction: "Add the 42g of coffee into your Chemex, centering and leveling out the grind. Place the Chemex on the scale and tare (zero out) the scale.",
//       time: 0
//     },
//     {
//       step_title: "Initial pour",
//       instruction: "When you're ready, click START to start the 30 second timer and begin pouring the hot water, slowly saturating all of the grind with about 150g of water. ",
//       time: 30
//     },
//     {
//       step_title: "Saturate and bloom!",
//       instruction: "Gently stir the grind to remove any clumps and to ensure your grind is fully saturated. Let it sit for the remainder of the time and be prepared to add water in the next step.",
//       time: 15
//     },
//     {
//       step_title: "Final pour and brew",
//       instruction: "Click START to begin the timer for pouring the remainder of your water (1:00 min.) and letting it brew (2:15 min.). Pour in a slow swirling motion from the edge of the grind inwards and outwards, focusing on the darker areas. Try to avoid pouring along the filter.",
//       time: 195
//     },
//     {
//       step_title: "Serve, enjoy, relax",
//       instruction: "Remove the filter, gently swirl the coffee in the Chemex and enjoy your comforting brew.",
//       time: 0
//     }
//   ]
// }).save()
//   .then(savedRecipe => {
//     console.log(savedRecipe);
//   })
//   .catch(err =>{
//     console.log(err)
//   });

// BrewMethod.find({})
//   .then(results => {
//     console.log(results);
//   })
//   .catch(err => {
//     console.log(err)
//   });

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT)
})