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


var spotifySong = function() {

  var spotify = new Spotify(keys.spotify);


}


var argv = process.argv;
var liriCommand = argv[2];

// if statement to execute function based on user's command
if(liriCommand === 'my-tweets') {
  tweets();
} else if(liriCommand === 'spotify-this-song') {
    
} else {
  console.log('\n' + "Invalid command; Please try again" + '\n');
}


