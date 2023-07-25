const poasterKey ="15d2ea6d0dc1d476efbca3eba2b9bbfb"

// hiding this elem at the start
$('#loadingDone').hide()

// The func that builds the cards in the carousel
function generateMovieHTML(movie) {

    let htmlD = `
          <div id="movie-${movie.id}" class="carousel-item" data-bs-interval="3000">
            <div class="card mx-auto my-1 bg-light bg-opacity-10" style="width: 18rem;">
                <div><img class="w-100 border border-light rounded-top img-responsive poster" id="thePoster-${movie.id}" src=""></div>
                <div class="card-body border border-top-0 rounded-bottom border-white">
                    <h5 class="card-title text-light movieTitle fs-6 text-center">${movie.title}</h5>
                    <p class="card-text text-light text-center">Rating: ${movie.rating}</p>
                    <button type="button" id="btnE-${movie.id}" class="btn btn-light text-light bg-transparent ms-2 me-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="movEdt(this.id)">Edit Movie</button>
                    <button id="btnD-${movie.id}" class="btn btn-light text-light bg-transparent delete-movie ms-2 me-1" data-id="${movie.id}" onclick="movDel(this.id)">Delete Movie</button>
                </div>
            </div>
          </div>
      `;
    return htmlD
}

const moviesURL = 'https://excessive-sulfuric-narwhal.glitch.me/movies';

// The first Loading of the Movie's
function loadMovies() {
    $.ajax({
        url: moviesURL,
        type: 'GET',
        success: function(response) {
            console.log(response)
            var moviesHTML = '';

            response.forEach(function(movie) {
                moviesHTML += generateMovieHTML(movie);
            });

            setTimeout(() => {
                $('#loading').remove();
                $('#loadingDone').show()
            }, "3000");
            setTimeout(() => {
                $('#movies-container').html(moviesHTML);
                $('#movie-1').addClass('active');
                getPoster(response)
            }, "3000");
        }
    });
}

// a trimmed version of the load Movies for actions taken by user
function loadMoviesFast() {
    $.ajax({
        url: moviesURL,
        type: 'GET',
        success: function(response) {
            var moviesHTML = '';

            response.forEach(function(movie) {
                moviesHTML += generateMovieHTML(movie);
            });
            setTimeout(() => {
                $('#movies-container').html(moviesHTML);
                $('#movie-1').addClass('active');
                getPoster(response)
            }, "1000");
        }
    });
}

// user adding a movie
$('#add-movie-form').submit(function(event) {
    event.preventDefault();

    var title = $('#title').val();
    var rating = parseInt($('#rating').val());

    $.ajax({
        url: moviesURL,
        type: 'POST',
        data: { title: title, rating: rating },
        success: function(response) {
            var movieHTML = generateMovieHTML(response);
            $('#movies-container').append(movieHTML);
            $('#add-movie-form')[0].reset();
            loadMoviesFast()
        }
    });
});

// user editing a movie
function movEdt(id){

    var movieId = id.replace('btnE-', '');
    console.log(movieId);
    $.ajax({
        url: `${moviesURL}/${movieId}`,
        type: 'GET',
        success: function(response) {
            var movie = response;

            $('#edit-movie-form input[name="title"]').val(movie.title);
            $('#edit-movie-form input[name="rating"]').val(movie.rating);
            $('#edit-movie-form input[name="movieId"]').val(movie.id);

        }
    });

}

// user editing a movie Submit
$('#edit-movie-form').submit(function(event) {
    event.preventDefault();

    var movieId = $('#edit-movie-form input[name="movieId"]').val();
    var title = $('#edit-movie-form input[name="title"]').val();
    var rating = parseInt($('#edit-movie-form input[name="rating"]').val());

    $.ajax({
        url: `${moviesURL}/${movieId}`,
        type: 'PUT',
        data: { title: title, rating: rating },
        success: function(response) {
            var updatedMovieHTML = generateMovieHTML(response);
            $('.movie[data-id="' + movieId + '"]').replaceWith(updatedMovieHTML);
            loadMoviesFast()
        }
    });
});

// user delete a movie
function movDel(id) {
    var movieId = id.replace('btnD-', '');

    $.ajax({
        url: `${moviesURL}/${movieId}`,
        type: 'DELETE',
        success: function() {
            loadMoviesFast()
        }
    });
}

// Getting the poster for each movie and any user edits or adds
function getPoster(res) {
    for (let i = 0; i < res.length; i++) {
        let test = '';
        $.getJSON(`https://api.themoviedb.org/3/search/movie?api_key=${poasterKey}&query=${res[i].title}`, function(json) {
            console.log(json);
            if (json.results.length > 0 && json.results[0].original_title.toLowerCase() === res[i].title.toLowerCase()) {
                test = `http://image.tmdb.org/t/p/w500${json.results[0].poster_path}`;
                $('.poster').eq(i).attr('src', test);
                if (json.results[0].original_title === '') {
                    $('.movieTitle').eq(i).text(res[i].title);
                } else {
                    $('.movieTitle').eq(i).text(json.results[0].original_title);
                }
                console.log(test);
            } else {
                test = "img/rick.jpg";
                $('.poster').eq(i).attr('src', test);
                console.log(test);
            }
        }).fail(function() {
            test = "img/rick.jpg";
            $('.poster').eq(i).attr('src', test);
            console.log(test);
        });
    }
}



loadMovies();