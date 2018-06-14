const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
  next();
});

let data = {
  hats: [
    {
      name: "Flat Cap",
      price: 19.99,
      img: "/img/hats/flatcap.jpg",
      type: "hat"
    },
    {
      name: "Stetson",
      price: 21.99,
      img: "/img/hats/stetson.jpg",
      type: "hat"
    },
    {
      name: "Sombrero",
      price: 23.99,
      img: "/img/hats/sombrero.jpg",
      type: "hat"
    },
    {
      name: "Blue Jays Baseball Snapback",
      price: 39.99,
      img: "/img/hats/baseball.jpg",
      type: "hat"
    },
    {
      name: "Sun Hat",
      price: 24.99,
      img: "/img/hats/sunhat.jpg",
      type: "hat"
    },
    {
      name: "Black Fedora",
      price: 59.99,
      img: "/img/hats/fedora.jpg",
      type: "hat"
    }
  ],
  shoes: [
    {
      name: "Nike Mercurial",
      price: 59.99,
      img: "/img/shoes/nike_mercurial.jpg",
      type: "shoe"
    },
    {
      name: "Adidas Adizero",
      price: 89.99,
      img: "/img/shoes/adidas.jpg",
      type: "shoe"
    },
    {
      name: "Nike Vapor Carbon",
      price: 129.99,
      img: "/img/shoes/vapor.jpg",
      type: "shoe"
    },
    {
      name: "Under Armour Spotlight",
      price: 110.99,
      img: "/img/shoes/ua-spotlight.jpg",
      type: "shoe"
    },
    {
      name: "Warrior",
      price: 99.99,
      img: "/img/shoes/warrior.jpg",
      type: "shoe"
    },
    {
      name: "New Balance Visaro 2",
      price: 229.99,
      img: "/img/shoes/newbalance.jpg",
      type: "shoe"
    }
  ],
  cart: []
};

app.get('/data', (req, res) => {
  res.json(data);
})

app.post('/cart', (req, res) => {
  let newItem = req.body;
  data.cart.push(newItem);
  res.json(data.cart);
})

app.post('/clearCart', (req,res)=> {
  data.cart = [];
  res.json(data.cart);
})

app.listen(8080, () => {
  console.log('listening');
})