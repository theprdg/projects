let request = require("request"),
  cheerio = require("cheerio"),
  info,                 //contains the TMDB JSON data 
  input = process.argv, //CLI input array
  movie = '',           //contains movie from user input
  timeOut,              //contains time in seconds before revealing spoiler
  googleScrapeURL,      //contains URL to scrape headlines of first-page search results
  spoilerScrapeURL;     //contains URL to scrape TMDB for JSON data

inputCheck(); //assigns and checks user input for movie and time-out 

function inputCheck() {
  
  //assign and sort movie and timeout values to corresponding variables
  for (i = 2; i < input.length; i++) {
    isNaN(Number(input[i])) ? movie += input[i] : timeOut = Number(input[i]);
  }
  
  googleScrapeURL = "https://www.google.ca/search?q=" + movie + "%20film";
  spoilerScrapeURL = "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + movie + "&language=en-US&api_key=1754ff7b172042ad1d8f49e25ef14a49";

  //check adequacy of CLI input
  errorChecks();
}

function errorChecks() {
  if (input.length < 3) return console.log("\nError, not enough parameters provided.\n");
  else if (input.length > 4) return console.log("\nError, too many parameters provided.\n");
  else {
    if (isNaN(timeOut)) return console.log("\nError, spoiler time not provided.\n");
    else if (!isNaN(movie)) return console.log("\nError, movie title not provided.\n");
    else if (timeOut < 0) return console.log("\nError, negative spoiler time provided.\n");
  }
  scrape(); //verify movie existence, query and display movie plot and Google search results
}

function scrape() {
  //scrape TMDB for CLI movie input
  request(spoilerScrapeURL, function (error, response, body) {
    if (!error) {
      info = JSON.parse(body);

      //check TMDB for any results of movie
      if (info.total_results == 0) {
        console.log('\nUnable to find movie!\n');
        return;
      }
      else {
        console.log("\n***spoiler warning*** We will be spoiling the plot of", movie, "in", timeOut, "second(s)!");

        //delays display of movie plot by CLI value in seconds
        setTimeout(function () {
          console.log("\n***MOVIE PLOT***\n" + info.results[0].overview + "\n");
        }, (timeOut * 1e3));

        //scrape first page of Google's search result of movie and display the title of search results
        request(googleScrapeURL, function (error, response, body) {
          if (!error) {
            console.log("\nHere are some Google search results for the movie", movie + ":\n");
            let $ = cheerio.load(body),
              titles = $(".r a");
            titles.each(function (i, title) {
              console.log($(title).text());
            });
          }
        });
      }
    }
  });
}