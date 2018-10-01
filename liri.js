//Code to read and set any environment vars with dotenv package
require("dotenv").config();

var keys = require("./keys.js");

var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
//----------------------------------------------------

/////////////////////////////
//
//BANDS IN TOWN `concert-this`
//
///////////////////////////
var searchBand = function () {
    this.findBand = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        request(URL, function (err, response, body) {
            var concertData = JSON.parse(body)[0];
            console.log("\nVenue Name: " + concertData.venue.name +
                "\nLocation: " + concertData.venue.city, concertData.venue.region + "\nConcert Date: " + concertData.datetime + "\n");
        });
    };
};

//////////////
//
// SPOTIFY 'spotify-this'
//
/////////////
var searchSong = function (song) {
    var spotify = new Spotify({
        id: "302fbbf27a24468ca9e4d93d3b45f60f",
        secret: "ae5ce7d04df8415390cf37e41b566837"
    });

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songData = data.tracks.items[0];

        console.log("\nArtist: " + songData.artists[0].name + "\nTitle: " + songData.name + "\nPreview Link: " + songData.preview_url + "\nAblum: " + songData.album.name + "\n")
    });
};
////////////////////////
//
//  OMDB 'movie-this'
//
////////////////////////

var searchMovie = function() {
    this.findMovie = function(film) {
        var URL = "http://www.omdbapi.com/?t=" + film + "&apikey=trilogy"

        request(URL, function(error, response, body){
            var movieData = JSON.parse(body);

            console.log("\nTitle: " + movieData.Title + "\nYear: " + movieData.Year + "\nRated: " + movieData.Rated + "\nIMDB Rating: " + movieData.imdbRating + "\nRotten Tomatoes Rating: " + JSON.stringify(movieData.Ratings[1]) + "\nCountry of Product: " + movieData.Country + "\nPlot Summary: " + movieData.Plot + "\nActors: " + movieData.Actors + "\n")
        })
    }
}
///////////////////////
//
// DO WHAT I SAY!
//
///////////////////////
fs.readFile("random.txt", "utf8", function(error, data){
    if (error) {
        return console.log(error);
    }
    console.log(data);
});

////////////////////////
//
// router / cli
//
////////////////////////

var command = process.argv[2];
// Command for BANDS IN TOWN
if (command === "concert-this") {
    var concert = new searchBand();
    concert.findBand(process.argv.slice(3).join(" "))
}
// Command for SPOTIFY
if (command === "spotify-this") {
    var song = process.argv.slice(3).join(" ")
    searchSong(song);
}
// Command for OMDB
if (command === "movie-this") {
    var newfilm = new searchMovie();
    newfilm.findMovie(process.argv.slice(3).join(" "))
}



