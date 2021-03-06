//Create Movie List
function createMovies(moviesList) {
    for (let i = 0; i < moviesList.results.length; i++) {
        let photos = moviesList.results[i].Poster
        let titles = moviesList.results[i].Title;
        let years = moviesList.results[i].Year;

        let mLink = 'https://movies-app-siit.herokuapp.com/movies/' + moviesList.results[i]._id;

        let movieList = document.getElementById('moviesList');

        let moviePoster = document.createElement('div');
        moviePoster.setAttribute('class', 'movie-poster');

        let movieLink = document.createElement('a');
        movieLink.setAttribute('href', mLink);

        let photo = document.createElement('img');
        photo.setAttribute('class', 'movie-picture');
        photo.src = photos;

        let title = document.createElement('p');
        title.setAttribute('class', 'movie-title');
        title.innerHTML = titles;

        let year = document.createElement('p');
        year.setAttribute('class', 'movie-year');
        year.innerHTML = years;

        movieList.appendChild(movieLink); //trimitere catre Movie Details

        movieLink.appendChild(moviePoster);

        moviePoster.append(photo, title, year);
    }
}