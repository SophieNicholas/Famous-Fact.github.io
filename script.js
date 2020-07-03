//TEST VARIABLE FOR SEARCH (change movie name here)
var filmSearch = ""
//Global Variables for GIPHY
var gifLimit = 700
var gifShuffleNumber = 0;
var gifClasses = [".gif1", ".gif2", ".gif3"];
var savedSearch = [];
var scrollButton = 0;

function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
console.log(capitalize_Words('js string exercises'));

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
$(".searchButton").on("click", function () {
  event.preventDefault();
  if($("#searchTerm").val()==""){
    return;
  };

  if($("#search-term2").val()==""){
    filmSearch = $("#searchTerm").val();
  }
  else{
    filmSearch = $("#search-term2").val();
  }
  savedSearch.push(filmSearch);
  localStorage.setItem("Searches", JSON.stringify(savedSearch));
  loadPage()
  mainSearch();
})

function mainSearch() {
  $("#delete").removeClass("delete");
  $(".threegifs").empty();
  if (scrollButton==0){
  $('html, body').animate({
    scrollTop: $($("a.searchButton").attr('href')).offset().top

    // Adjustable scroll speed here
  }, 800);
}
  scrollButton++
  var gifQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + filmSearch + "&api_key=jPos9RSs2YFAD8HQVQCBt782M5HUNlT6&limit=" + gifLimit;
  console.log("hello");
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
    var i3 = 0

    //runs loop here
    for (var i = 0; i < gifresults.length; i++) {

      // looks for all gifs that are not rated r
      if (gifresults[gifShuffleNumber[i]].rating !== "r") {
        if (gifresults[gifShuffleNumber[i]].title.indexOf("film") >= 0 | gifresults[gifShuffleNumber[i]].slug.indexOf("film") >= 0 | gifresults[gifShuffleNumber[i]].title.indexOf("movie") >= 0 | gifresults[gifShuffleNumber[i]].slug.indexOf("movie") >= 0) {
          console.log(gifresults[1].rating)
          // looks for gifs that are 200px in height and less then 351px in width
          if (gifresults[gifShuffleNumber[i]].images.fixed_height.width < 361) {
            var gifDiv = $("<div>").css("float","None");
            var gifOutput = $("<img>");
            gifOutput.attr({ "src": gifresults[gifShuffleNumber[i]].images.fixed_height.url, "alt": gifresults[gifShuffleNumber[i]].title });
            gifDiv.append(gifOutput);
            var gifNumber = gifClasses[i2];
            $(gifNumber).append(gifDiv);
            i2++;
            if (i2 == 3) {
              i = gifLimit;
            }
          }
          console.log(i2)
          console.log(i)
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
        tomatoIcon.attr("style", "width:100px; height:100px");
        var imdbDiv = $("<td>");
        var imdbIcon = $("<img>");
        imdbIcon.attr("src", "css/imdb.png");
        imdbIcon.attr("style", "width:100px; height:100px");
        var metaDiv = $("<td>");
        var metaCIcon = $("<img>");
        metaCIcon.attr("src", "css/meta.png");
        metaCIcon.attr("style", "width:100px");

        ratingsDiv.html("<td>" + response.Ratings[1].Value + "</td><td>" + response.Ratings[0].Value + "</td><td>" + response.Ratings[2].Value + "</td>");
        tomatoDiv.append(tomatoIcon);
        imdbDiv.append(imdbIcon);
        metaDiv.append(metaCIcon);
        $("#icons").prepend(tomatoDiv, imdbDiv, metaDiv);
      });
  } omdb(filmSearch);
  function generateRandomNews() {
    var HongAPIkey = "d6b8b08a14b6f4279a4ddf7eb7c50f4c";
    var search = capitalize_Words(filmSearch);
    var changeArticleCount = 0;
    // Their AJAX method is a little different from what we've learnt
    fetch('https://gnews.io/api/v3/search?q=' + search + '&token=' + HongAPIkey + '&in=title')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var URLlink = $("#news-title-link");
        var randomIndex = Math.floor(Math.random() * data.articles.length);
        var randomArticle = data.articles[randomIndex];
        var articleTitle = randomArticle.title;
        // Just for testing
        console.log(articleTitle);
        console.log(typeof (articleTitle));
        console.log(typeof (data.articles.length))
        console.log(randomIndex);
        console.log(randomArticle.url);
        // To avoid unrelated articles with the same words (string must be in that sequence)
        if (articleTitle.includes(search)) {
          console.log(true);
          // Adding attributes and text to the body
          URLlink.attr({
            "href": randomArticle.url,
            "target": "_blank"
          });
          URLlink.text(randomArticle.title);
          $("#news-description").text(randomArticle.description);
          $("#published-date").text(randomArticle.publishedAt);
        } else {
          changeArticleCount += 1;
          console.log(false);
          generateRandomNews();
        }
      });
    console.log(changeArticleCount)
  }
  generateRandomNews();
}


loadPage();

function loadPage() {
  $(".lastFive").empty();
  var storedList = JSON.parse(localStorage.getItem("Searches"));
  if (storedList !== null) {
    savedSearch = storedList
    if (savedSearch.length > 5) {
      var savedSearch2 = []
      for (var i = 1; i < savedSearch.length; i++) {
        savedSearch2.push(savedSearch[i]);
      }
      savedSearch = savedSearch2;
      console.log(savedSearch)
    }
    for (var i = 0; i < savedSearch.length; i++) {
      var listItem = $("<li>").attr({
        "class": "listed",
        "href": "#second-page"
      }).css("color", "white");
      listItem.text(savedSearch[i]);
      $(".lastFive").prepend(listItem);
    }
  }
}


$(".lastFive").on("click", function (event) {
  //event.preventDefault();
  filmSearch = event.target.textContent;
  console.log(filmSearch);
  mainSearch();
});


// Run this when DOM has been loaded
$(document).ready(function () {
  $(".listed").on("click", function () {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
  
      // Adjustable scroll speed here
    }, 800);
  })
})