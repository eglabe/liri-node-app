// Node packages required
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

// Pulls in data from keys.js file
var twitterKeys = require("./keys.js");

// Takes command line input after the 2nd index and stores it in a var
var command = process.argv[2];
// As above... but with the movie/song the user requests
var media = process.argv.slice(3);

// To use as needed
var line = ("----------------------------");

switch (command) {
  case "my-tweets":
    runTwitter();
    break;

  case "spotify-this-song":
    runSpotify();
    break;

  case "movie-this":
    runRequest();
    break;

  case "do-what-it-says":
    runFS();
    break;
}


// `my-tweets`
function runTwitter() {
	console.log(line);

	var client = new twitter({
	consumer_key: twitterKeys.twitterKeys.consumer_key,
	consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	access_token_key: twitterKeys.twitterKeys.access_token_key,
	access_token_secret: twitterKeys.twitterKeys.access_token_secret
	});

	client.get('statuses/user_timeline', function(error, tweets, response) {

		if(!error && tweets) {
			for (var i = 0; i < 10; i++) {

				console.log(i+1 + ": " + tweets[i].text);
				console.log(tweets[i].created_at);
				console.log(line);

			};
		};

	});
}


// `spotify-this-song`
function runSpotify() {

	if (media === undefined) {
		spotify.search({ type: 'track', query: "the sign" }, function(err, data) {
			
			if (data) {
				console.log(line);
				console.log("Song: " + JSON.stringify(data.tracks.items[0].name));
				console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
				console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
				console.log("Preview: " + JSON.stringify(data.tracks.items[0].preview_url));
				console.log(line);
			}

		});
	} else {
		spotify.search({ type: 'track', query: media }, function(err, data) {
			
			if (data) {
				console.log(line);
				console.log("Song: " + JSON.stringify(data.tracks.items[0].name));
				console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
				console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
				console.log("Preview: " + JSON.stringify(data.tracks.items[0].preview_url));
				console.log(line);
			}

		});
	} 
}


// `movie-this`
function runRequest() {

	request("http://www.omdbapi.com/?t=" + media + "&y=&plot=short&r=json", function(error, response, body) {

	// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {

			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			console.log(line);
			console.log("Movie title: " + JSON.parse(body).Title);    
			console.log("Release year: " + JSON.parse(body).Year);    
			console.log("IMDB rating: " + JSON.parse(body).imdbRating);
			console.log("Country: " + JSON.parse(body).Country);    
			console.log("Language(s): " + JSON.parse(body).Language);    
			console.log("Plot: " + JSON.parse(body).Plot);    
			console.log("Actors: " + JSON.parse(body).Actors);  
			console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);    

			// console.log("Rotten Tomatoes URL: " + JSON.parse(body).Actors);    

			console.log(line);
		}
	});
}


// `do-what-it-says`
function runFS() {
	console.log("as you wish!");
}
