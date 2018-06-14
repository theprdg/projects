const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//REQUIRE AND CONFIGURE KNEX
const knex = require('knex')({
  client: 'postgres',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'todolist',
    charset: 'utf8'
  }
});

//CONNECT BOOKSHELF WITH KNEX
const bookshelf = require('bookshelf')(knex);

//CREATE BOOKSHELF MODEL FOR TODOLIST/CATEGORIES
//AND CONNECT 
const Category = bookshelf.Model.extend({
  tableName: 'categories',
  list: function() {
    return this.hasMany(Todolist)
  }
})

const Todolist = bookshelf.Model.extend({
  tableName: 'list',
  categories: function() {
    return this.belongsTo(Category)
  } 
})

//***********CRUD FOR TODO LIST***********//
//CREATE
app.post('/', (req, res) => {
  let newToDo = req.body;
  let newItem = new Todolist({
    todoItem: newToDo.todoItem,
    complete: false,
    category_id: newToDo.category_id
  })

  newItem.save()
    .then(addedItem => {
      console.log('New item added to server');
      res.json(addedItem)
    })
    .catch(error => {
      console.log(error)
    })
})

//READ
app.get('/', (req, res) => {
  let list = [];
  Todolist.where({})
    .fetchAll()
    .then(results => {
      for (i of results.models)
        list.push(i.attributes);
    })
    .then(() => {
      console.log(list) 
      res.json(list);
    })
    .catch(error => {
      console.log(error);
    })
})

//UPDATE
app.put('/', (req, res) => {
  console.log(req.body)
  new Todolist({
    id: req.body.id
  })
    .save({
      complete: req.body.complete
    })
    .then(results => {
      console.log(results);
      res.send('Item updated');
    })
    .catch(error => {
      console.log(error);
    })
})

//DELETE
app.delete('/', (req, res) => {
  Todolist.where({
    complete: true
  })
    .destroy()
    .then(results => {
      console.log(results);
      res.send('Items deleted');
    })
    .catch(error => {
      console.log(error)
    })
})

//***********CRUD FOR CATEGORIES***********//
//CREATE
app.post('/category', (req, res) => {
  let newCat = req.body;
  let newItem = new Category({
    category: newCat.category
  })

  newItem.save()
    .then(addedCat => {
      console.log('New category added to server');
    })
    .catch(error => {
      console.log(error)
    })
})

//READ
app.get('/category', (req, res) => {
  let catList = [];
  Category.where({})
    .fetchAll()
    .then(results => {
      for (i of results.models)
        catList.push(i.attributes);
    })
    .then(() => {
      res.json(catList);
    })
    .catch(error => {
      console.log(error);
    })
})

//UPDATE
app.put('/category', (req, res) => {
  console.log(req.body)
  new Category({
    id: req.body.id
  })
    .save({
      category: req.body.category
    })
    .then(results => {
      console.log(results);
      console.log('Category updated')
    })
    .catch(error => {
      console.log(error);
    })
})

//DELETE
app.delete('/category', (req, res) => {
  Category.where({
    id: req.body.id
  })
    .destroy()
    .then(results => {
      console.log(results);
      console.log('Category deleted')
    })
    .catch(error => {
      console.log(error)
    })
})

app.listen(8080, () => {
  console.log('listening')
})