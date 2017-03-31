// Node packages required
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

// Pulls in data from keys.js file
var twitterKeys = require("./keys.js");

// Takes command line input after the 2nd index and stores it in a var
var command = process.argv.slice(2);

// To make my life a bit easier
var line = ("-----------------------")


// `my-tweets`
if (command == "my-tweets") {
	console.log("tweet!");

	var client = new twitter({
	consumer_key: twitterKeys.twitterKeys.consumer_key,
	consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	access_token_key: twitterKeys.twitterKeys.access_token_key,
	access_token_secret: twitterKeys.twitterKeys.access_token_secret
	});

	client.get('favorites/list', function(error, tweets, response) {
	if(error) throw error;

	if(tweets) {
		console.log(line);
		console.log(tweets.created_at);
		console.log(line);
	}
	// console.log(tweets);  // The favorites. 
	// console.log(response);  // Raw response object. 
	});
}


// `spotify-this-song`
if (command == "spotify-this-song") {
	console.log("song!");
}


// `movie-this`
if (command == "movie-this") {
	console.log("movie!");
}


// `do-what-it-says`
if (command == "do-what-it-says") {
	console.log("as you wish!");
}
