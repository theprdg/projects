const express = require('express'),
  app = express(),
  request = require('request');

app.use(express.static('public'));
app.set('view engine', 'ejs');

let info; //CONTAINS DATA OF TOP-RATED MOVIES

//RENDER HOME PAGE
app.get('/', (req, res) => {
  res.render('index', { movies: info });
});

//QUERY MOVIE DETAILS, RENDER MOVIE PAGE
app.get('/movie/:id', (req, res) => {
  let idNum = req.params.id;
  request('https://api.themoviedb.org/3/movie/' + idNum + '?api_key=1754ff7b172042ad1d8f49e25ef14a49&language=en-US', function (err, resp, body) {
    if (!err) {
      movies = JSON.parse(body);
      //CATCH INVALID / NON-NUMERIC MOVIE IDs
      if (movies.status_code === 34 || isNaN(idNum)) res.render('error');
    } else {
      res.send('Error!');
      return;
    }
    res.render('movie', { movies: movies });
  });
});

//QUERY SEARCH RESULTS, RENDER SEARCH PAGE
app.get('/search', (req, res) => {
  let query = req.query.searchTerm;

  if (query == undefined) res.render('error'); //CATCH INVALID SEARCH PATH
  else if (query == '') query = ' '; //CATCH EMPTY SEARCH

  request('https://api.themoviedb.org/3/search/movie?api_key=1754ff7b172042ad1d8f49e25ef14a49&language=en-US&query=' + query.toLowerCase() + '&page=1&include_adult=false', function (err, resp, body) {
    if (!err) {
      movies = JSON.parse(body).results;
    } else {
      res.send('Error!');
      return;
    }
    res.render('search', {
      movies: movies,
      query: query
    });  
  });
});

//CATCHALL FOR INVALID URL PATH
app.get('*', (req, res) => {
  res.render('error');
});

//QUERY TOP-RATED MOVIES FOR MAIN PAGE
request('https://api.themoviedb.org/3/movie/top_rated?api_key=1754ff7b172042ad1d8f49e25ef14a49&language=en-US&page=1', function (err, resp, body) {
  if (!err) {
    info = JSON.parse(body).results;
  } else {
    res.render('Error!');
    return;
  }
})

//INITIATE SERVER
app.listen(8080, () => {
  console.log('Server Started on http://localhost:8080');
  console.log('Press CTRL + C to stop server');
});