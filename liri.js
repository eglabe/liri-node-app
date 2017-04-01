// Node packages required
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

// Pulls in data from keys.js file
var twitterKeys = require("./keys.js");

// Takes command line input after the 2nd index and stores it in a var
var command = process.argv[2];
// As above... but with the movie/song the user requests
var media = process.argv[3];

// To use as needed
var line = ("----------------------------");

// Switch case for the 4 fuctions
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

	// From Twitter API; necessary for call
	// Keys stored in keys.js
	var client = new twitter({
	consumer_key: twitterKeys.twitterKeys.consumer_key,
	consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	access_token_key: twitterKeys.twitterKeys.access_token_key,
	access_token_secret: twitterKeys.twitterKeys.access_token_secret
	});

	// Get call to Twitter
	client.get('statuses/user_timeline', function(error, tweets, response) {

		// If the call was successful... 
		if(!error && tweets) {

			// Displays text and time of ten tweets
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

		if(!media) {
			media = "ace of base the sign"; 
		}

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


// `movie-this`
function runRequest() {



	if(!media) {
		media = "mr nobody"; 
	} 

	// Request call to OMDB API
	request("http://www.omdbapi.com/?t=" + media + "&y=&plot=short&r=json", function(error, response, body) {

		// If the request is successful...
		if (!error && response.statusCode === 200) {
			// Parses all of the desired information

			var jp = JSON.parse(body);

			console.log(line);
			console.log("Movie title: " + jp.Title);    
			console.log("Release year: " + jp.Year);    
			console.log("IMDB rating: " + jp.imdbRating);
			console.log("Country: " + jp.Country);    
			console.log("Language(s): " + jp.Language);    
			console.log("Plot: " + jp.Plot);    
			console.log("Actors: " + jp.Actors);  
			if (jp.Ratings[1]) {
			console.log("Rotten Tomatoes rating: " + jp.Ratings[1].Value);  
			}  
			console.log("Rotten Tomatoes URL: " + (jp.tomatoURL || "N/A") );    
			console.log(line);
		}
	});
}


// `do-what-it-says`
function runFS() {

	// Read the random.txt file
	fs.readFile("random.txt", "utf8", function(err, data) {

		// Splits string at the index of the ","
		// Stores each half in two variables
		var index = data.indexOf(",");
		var doThis = data.substr(0, index);
		var song = data.substr(index + 1);

		// Reassign "media" variable and run spotify command function
		media = song;
		runSpotify();

	});
}
