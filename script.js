//omdb api
function omdb(title){
    //building url to query database
    omdbURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    
    //run AJAX call to the OpenWeatherMap API
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
        $("#time").text("<b>Running time:</b> "+response.Runtime);
        //Plot
        $("#plot").text("Plot");
$("#plot").html("<p>"+response.Plot+"</p>");
//director and cast
$("#directorANDcast").html("<p><b>Director:</b> "+response.Director+"<br><b>Starring:</b> "+response.Actors+"</p>");
    //ratings
    var tomDiv =$("<div>");
    var tomatoIcon =$("<img>");
    tomatoIcon.attr("src","tomato.png");
    tomatoIcon.attr("style","width:100px");
    var imdbDiv =$("<div>");
    var imdbIcon = $("<img>");
    imdbIcon.attr("src","imdb.png");
    imdbIcon.attr("style","width:100px");
    var metaDiv=$("<div>");
    var metaCIcon=$("<img>");
    metaCIcon.attr("src","meta.png");
    metaCIcon.attr("style","width:100px");
    
    tomDiv.html("<p>"+response.Ratings[1].Value+"</p>");
    tomDiv.prepend(tomatoIcon);
    $("#ratings").append(tomDiv);    
    
    imdbDiv.html("<p>"+response.Ratings[0].Value+"</p>");
    imdbDiv.prepend(imdbIcon);
    $("#ratings").append(imdbDiv);
    
    metaDiv.html("<p>"+response.Ratings[2].Value+"</p>");
    metaDiv.prepend(metaCIcon);
    $("#ratings").append(metaDiv);
      
    });
    }
    omdb("home");