//TEST VARIABLE FOR SEARCH (change movie name here)
var filmSearch = "star trek"
//Global Variables for GIPHY
var gifLimit = 700
var gifQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + filmSearch + "&api_key=jPos9RSs2YFAD8HQVQCBt782M5HUNlT6&limit=" + gifLimit;
console.log(gifQueryURL);
var gifShuffleNumber = 0;
var gifClasses = [".gif1", ".gif2", ".gif3", ".gif4"];

//SHUFFLE FUNCTION
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//end of function

//GIPHY Ajax search
$.ajax({
  url: gifQueryURL,
  method: "GET"
}).then(function (response2) {
  console.log(response2);
  var gifresults = response2.data
  console.log(gifresults)
  var i2 = 0

  //creates a random number array the length of the limit to randomize the gif output
  var gifShuffleNumber = [];
  for (var n = 0; n < gifresults.length; n++) {
    gifShuffleNumber.push(n);
  }
  shuffle(gifShuffleNumber);
  console.log(gifShuffleNumber);
  var i2 = 0

  //runs loop here
  for (var i = 0; i < gifresults.length; i++) {

    // looks for all gifs that are not rated r
    if (gifresults[gifShuffleNumber[i]].rating !== "r") {
      if (gifresults[gifShuffleNumber[i]].title.indexOf("film") >= 0 | gifresults[gifShuffleNumber[i]].slug.indexOf("film") >= 0 | gifresults[gifShuffleNumber[i]].title.indexOf("movie") >= 0 | gifresults[gifShuffleNumber[i]].slug.indexOf("movie") >= 0) {
        // looks for gifs that are 200px in height and less then 351px in width
        //if (gifresults[gifShuffleNumber[i]].images.fixed_height.width < 281) {
          var gifDiv = $("<div>").css("float", "none");
          var gifOutput = $("<img>");
          gifOutput.attr({ "src": gifresults[gifShuffleNumber[i]].images.fixed_height.url, "alt": gifresults[gifShuffleNumber[i]].title });
          gifDiv.append(gifOutput);
          var gifNumber = gifClasses[i2];
          $(gifNumber).append(gifDiv);
          i2++;
          if (i2 == 2) {
            i = gifLimit;
          }
       // }
      }
    }
  }
});

//End GIPHY Ajax search

//omdb api
function omdb(title) {
  //building url to query database
  omdbURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

  //run AJAX call to the omdb API
  $.ajax({
    url: omdbURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(omdbURL);

      // Log the resulting object
      console.log(response);
      //title
      $("#title").text(response.Title);
      //running time
      $("#time").html("<b>Running time:</b> " + response.Runtime);
      //Plot
      $("#plot").text("Plot");
      $("#plot").html("<p>" + response.Plot + "</p>");
      //director and cast
      $("#directorANDcast").html("<p><b>Director:</b> " + response.Director + "<br><b>Starring:</b> " + response.Actors + "</p>");
      //poster
      $("#poster").attr("src", response.Poster);
      //ratings
      var ratingsDiv = $("#ratings");
      var tomatoDiv = $("<td>");
      var tomatoIcon = $("<img>");
      tomatoIcon.attr("src", "css/tomato.png");
      tomatoIcon.attr("style", "width:100px");
      var imdbDiv = $("<td>");
      var imdbIcon = $("<img>");
      imdbIcon.attr("src", "css/imdb.png");
      imdbIcon.attr("style", "width:100px");
      var metaDiv = $("<td>");
      var metaCIcon = $("<img>");
      metaCIcon.attr("src", "css/meta.png");
      metaCIcon.attr("style", "width:100px");

      ratingsDiv.html("<td>" + response.Ratings[1].Value + "</td><td>" + response.Ratings[0].Value + "</td><td>" + response.Ratings[2].Value + "</td>");
      tomatoDiv.append(tomatoIcon);
      imdbDiv.append(imdbIcon);
      metaDiv.append(metaCIcon);
      $("#icons").prepend(tomatoDiv, imdbDiv, metaDiv);
      //gif Actor search
      var gifActors = response.Actors;
      gifActors = gifActors.split(',')
      var gifQueryActors = "https://api.giphy.com/v1/gifs/search?q=" + gifActors[(Math.floor(Math.random() * 4))] + "&api_key=jPos9RSs2YFAD8HQVQCBt782M5HUNlT6&limit=" + gifLimit;

      $.ajax({
        url: gifQueryActors,
        method: "GET"
      }).then(function (response3) {
        //creates a random number array the length of the limit to randomize the gif output
        var gifShuffleNumber2 = [];
        var gifresults2 = response3.data;
        for (var nn = 0; nn < gifresults2.length; nn++) {
          gifShuffleNumber2.push(nn);
        }
        shuffle(gifShuffleNumber2);
        var ia2 = 0
        for (var ia = 0; ia < gifresults2.length; ia++) {
          // looks for all gifs that are not rated r
          if (gifresults2[gifShuffleNumber2[ia]].rating !== "r") {
           // if (gifresults2[gifShuffleNumber2[ia]].title.indexOf(filmSearch) >= 0 | gifresults2[gifShuffleNumber2[ia]].slug.indexOf(filmSearch) >= 0 | gifresults2[gifShuffleNumber2[ia]].title.indexOf("movie") >= 0 | gifresults2[gifShuffleNumber2[ia]].slug.indexOf("movie") >= 0) {
              // looks for gifs that are 200px in height and less then 351px in width
              if (gifresults2[gifShuffleNumber2[ia]].images.fixed_height.width < 281) {
                var gifDiv2 = $("<div>").css("float", "none");
                var gifOutput2 = $("<img>");
                gifOutput2.attr({ "src": gifresults2[gifShuffleNumber2[ia]].images.fixed_height.url, "alt": gifresults2[gifShuffleNumber2[ia]].title });
                gifDiv2.append(gifOutput2);
                var gifNumber2 = gifClasses[ia2 + 2];
                $(gifNumber2).append(gifDiv2);
                ia2++
                if (ia2 == 2) {
                  ia = gifresults2.length;
                }
              }
            //}
          }
        }
      })
    })
}

omdb(filmSearch);