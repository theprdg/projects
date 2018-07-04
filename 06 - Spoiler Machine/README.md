This CLI app pulls movie search results and movie spoiler from Google and The Movie Database (TMDB) API respectively, using request.js based on user input. 

Executing with node, the user inputs a movie title to search and a time delay in seconds (e.g. 'node spoiler.js extraterrestrial 5'. The app proceeds to get and present the headers of the first search result page from Google, gets the movie overview/synopsis from TMDB, and delays the number of seconds before showing it to the user.
