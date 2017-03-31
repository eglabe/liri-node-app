// Node packages required
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

// Pulls in data from keys.js file
var twitterKeys = require("./keys.js");

// Takes command line input after the 2nd index and stores it in a var
var command = process.argv[2];
// As above... but with the movie/song the user requests
var request = process.argv.slice(3);

// To use as needed
var line = ("-----------------------");

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
	console.log("tweet!");

	var client = new twitter({
	consumer_key: twitterKeys.twitterKeys.consumer_key,
	consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	access_token_key: twitterKeys.twitterKeys.access_token_key,
	access_token_secret: twitterKeys.twitterKeys.access_token_secret
	});

	client.get('statuses/user_timeline', function(error, tweets, response) {
		if(error) throw error;

		if(tweets) {
			for (var i = 0; i < 10; i++) {
			
			console.log(line);
			console.log(i+1 + ": " + JSON.stringify(tweets[i].text));	
			console.log(JSON.stringify(tweets[i].created_at));
			console.log(line);

			};
		};
	});
}


// `spotify-this-song`
function runSpotify() {
	console.log("song!");
}


// `movie-this`
function runRequest() {
	console.log("movie!");
}


// `do-what-it-says`
function runFS() {
	console.log("as you wish!");
}
