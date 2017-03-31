var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

var keys = require("./keys.js");

var command = process.argv.slice(2);


// `my-tweets`
if (command == "my-tweets") {
	console.log("tweet!");
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
