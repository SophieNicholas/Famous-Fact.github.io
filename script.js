//omdb api
function omdb(title){
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
        $("#time").html("<b>Running time:</b> "+response.Runtime);
        //Plot
        $("#plot").text("Plot");
$("#plot").html("<p>"+response.Plot+"</p>");
//director and cast
$("#directorANDcast").html("<p><b>Director:</b> "+response.Director+"<br><b>Starring:</b> "+response.Actors+"</p>");
//poster
$("#poster").attr("src",response.Poster);    
//ratings
    var ratingsDiv =$("#ratings");
    var tomatoDiv =$("<td>");
    var tomatoIcon =$("<img>");
    tomatoIcon.attr("src","css/tomato.png");
    tomatoIcon.attr("style","width:100px");
    var imdbDiv =$("<td>");
    var imdbIcon = $("<img>");
    imdbIcon.attr("src","css/imdb.png");
    imdbIcon.attr("style","width:100px");
    var metaDiv=$("<td>");
    var metaCIcon=$("<img>");
    metaCIcon.attr("src","css/meta.png");
    metaCIcon.attr("style","width:100px");
    
    ratingsDiv.html("<td>"+response.Ratings[1].Value+"</td><td>"+ response.Ratings[0].Value+"</td><td>"+response.Ratings[2].Value+"</td>");
    tomatoDiv.append(tomatoIcon);
    imdbDiv.append(imdbIcon);
    metaDiv.append(metaCIcon);
    $("#icons").prepend(tomatoDiv,imdbDiv,metaDiv);    
    
    });
    }
    omdb("home");