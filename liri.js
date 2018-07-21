require("dotenv").config();


var keys = require("./keys.js");



var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// var spotify = require('spotify');
var fs = require('fs');



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
          "Tweet: " : tweets[i].text,
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

      console.log(
        '\n'+ "Artist: " + data.tracks.items[0].artists[0].name +
        '\n' + "Song Title: " + "'" + data.tracks.items[0].name + "'" +
        '\n' + "Album: " + data.tracks.items[0].album.name +
        '\n' + "URL: " + data.tracks.items[0].preview_url + 
        '\n'
      );
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

} else {
  console.log('\n' + "Invalid command; Please try again" + '\n');
}