require("dotenv").config();

var keys = require("./keys.js");

var request = require('request');
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');



// Function to display 20 most recent Twitter posts
var tweets = function() {

  var client = new Twitter(keys.twitter);

  //Setting screen name to twitter handle -> hsbNodeProject (20 total tweets)
  var params = {screen_name: 'hsbNodeProject', count: 20};
  
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var tweetsArr = [];
      for(var i = 0; i < tweets.length; i++) {
        tweetsArr.push({
          "Tweet: ": tweets[i].text,
          "Created on: " : tweets[i].created_at,
        })
      }
      console.log(tweetsArr);
      // console.log(tweets);
    } else {
      console.log("Error: " + err);
    }
  });
}

//Function to find info of user's searched song via Spotify
var spotifyInfo = function(songName) {

  var spotify = new Spotify(keys.spotify);
  var songName = process.argv.slice(3).join(" "); 

  if(!songName) {
    songName = "The Sign Ace of Base";
  }

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {

      songName = argv[3];

      // console logging the data to see the key value pairs of the API used below ex. data.tracks.item
      // console.log(JSON.stringify(data, null, 2));

      console.log(
        '\n'+ "Artist: " + data.tracks.items[0].artists[0].name + '\n' +
        '\n' + "Song Title: " + "'" + data.tracks.items[0].name + "'" + '\n' +
        '\n' + "Album: " + data.tracks.items[0].album.name + '\n' +
        '\n' + "URL: " + data.tracks.items[0].preview_url + 
        '\n'
      );
    }
  });
}

var movieInfo = function(movieName) {

  var movieName = process.argv.slice(3).join(" "); 

  if(!movieName){
    movieName = "Mr. Nobody";
  }
  var URL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=541a3445";

  request(URL, function(err, response, body) {
    var jsonData = JSON.parse(body);

    var movieData = [
      "Movie Title: " + jsonData.Title,
      "Release Year: " + jsonData.Year,
      "Rated: " + jsonData.Rated,
      "Rating(IMDB): " + jsonData.imdbRating,
      // "Rating(RottenTomatoes): " + jsonData.Ratings[1].Value,
        //left the Ratings from RottenTomatoes out because some do not have RottenTomatoe values and thus cause an error
      "Production: " + jsonData.Production,
      "Country(Production): " + jsonData.Country,
      "Language: " + jsonData.Language,
      "Actors/Actresses: " + jsonData.Actors,
      "Plot: " + jsonData.Plot,
    ].join("\n\n");

    console.log(movieData);
  });

}

var doAsTold = function() {
  fs.readFile('./random.txt', 'UTF8', function (error, data) {

		if (error) {
			console.log('ERROR: ' + error);
			return;
		} else {
      console.log(data);

      //splitting random.txt where there are commas, so that we have 2 elements in the array now: spotify-this-song AND "I Want it That Way"
      var arr = data.split(',');
      //the stored, spotify-this-song is the value of arr[0], which is now stored into the variable spotifyThisSong
      // argv[2] = arr[0];
      //"I Want it That Way" is the value of arr[1], and is now stored into the variable IWantItThatWay
      var IWantItThatWay = arr[1];

      // console.log(IWantItThatWay);

      spotifyInfo(IWantItThatWay);
    }
  });
}

var argv = process.argv;
var liriCommand = argv[2];

// if statement to execute function based on user's command
if(liriCommand === 'my-tweets') {
  tweets();

} else if(liriCommand === 'spotify-this-song') {
  // spotify.spotifyInfo(thirdArgv);
  spotifyInfo();

} else if(liriCommand === 'move-this') {
  movieInfo();

} else if(liriCommand === 'do-what-it-says') {
  doAsTold();

} else {
  console.log('\n' + "Invalid command; Please try again" + '\n');

}