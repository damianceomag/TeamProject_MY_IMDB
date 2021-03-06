const titleKey = "Title=", yearKey = "Year=", runtimeKey = "Runtime=", genreKey = "Genre=", languageKey = "Language=", countryKey = "Country=", posterKey = "Poster=", imdbRatingKey = "imdbRating=", imdbVotesKey = "imdbVotes=", imdbIDKey = "imdbID=", typeKey = "Type=";
let theLastResponse = '';

let showInputsValue = () => {
    let inputs = [];
    let titleInput = document.getElementById('title');
    if (titleInput.value != '') {
        inputs.push(titleKey + titleInput.value);
    }
    let yearInput = document.getElementById('year');
    if (yearInput.value != '') {
        inputs.push(yearKey + yearInput.value);
    }
    let runtimeInput = document.getElementById('runtime');
    if (runtimeInput.value != '') {
        inputs.push(runtimeKey + runtimeInput.value);
    }
    let genreInput = document.getElementById('genre');
    if (genreInput.value != '') {
        inputs.push(genreKey + genreInput.value);
    }
    let languageInput = document.getElementById('language');
    if (languageInput.value != '') {
        inputs.push(languageKey + languageInput.value);
    }
    let countryInput = document.getElementById('country');
    if (countryInput.value != '') {
        inputs.push(countryKey + countryInput.value);
    }
    let imdbRatingInput = document.getElementById('imdbRating');
    if (imdbRatingInput.value != '') {
        inputs.push(imdbRatingKey + imdbRatingInput.value);
    }
    let imdbVotesInput = document.getElementById('imdbVotes');
    if (imdbVotesInput.value != '') {
        inputs.push(imdbVotesKey + imdbVotesInput.value);
    }
    let imdbIDInput = document.getElementById('imdbID');
    if (imdbIDInput.value != '') {
        inputs.push(imdbIDKey + imdbIDInput.value);
    }
    let typeInput = document.getElementById('type');
    if (typeInput.value != '') {
        inputs.push(typeKey + typeInput.value);
    }
    return inputs;
};

let urlConstructor = (showInputsValue) => {
    const baseUrl = "https://movies-app-siit.herokuapp.com/movies?"
    let inputsValue = showInputsValue();
    if (inputsValue.length === 0) {
        return baseUrl;
    } else {
        let url = baseUrl + inputsValue.join('&');
        return url;
    };
};

let runFilter = (url) => {
    clearData();
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((jsonResponse) => {
            createMovies(jsonResponse);
            emptyPage(jsonResponse);
            theLastResponse = jsonResponse.pagination;
            movieDetails(jsonResponse);
        }).catch(function (error) {
            console.log('Error: ', error);
        });
};

let movieDetails = (moviesList) => {
    let moviePoster = document.getElementsByClassName('movie-poster');
    for (let i = 0; i < moviesList.results.length; i++) {
        let genres = moviesList.results[i].Genre;
        let countries = moviesList.results[i].Country;
        let genre = document.createElement('p');
        genre.setAttribute('class', 'movie-genre');
        genre.innerHTML = genres;
        let country = document.createElement('p');
        country.setAttribute('class', 'movie-country');
        country.innerHTML = countries;

        let detailsButt = document.createElement('button');
        detailsButt.setAttribute('class', 'detailsButt');
        detailsButt.innerHTML = 'Details';
        moviePoster[i].append(genre, country, detailsButt);
    };
};

let onClickNext = (lastResponse) => {
    let linkNext = lastResponse.links.next;
    if (linkNext === null) {
        runFilter(urlConstructor(showInputsValue));
    } else {
        return linkNext
    };
};

let onClickBack = (lastResponse) => {
    let linkBack = lastResponse.links.prev;
    if (linkBack != null) {
        return linkBack;
    } else {
        runFilter(urlConstructor(showInputsValue));
    };
};

document.getElementById('search').onclick = () => {
    runFilter(urlConstructor(showInputsValue));
};

document.getElementById('next').onclick = () => {
    runFilter(onClickNext(theLastResponse));
};

document.getElementById('back').onclick = () => {
    runFilter(onClickBack(theLastResponse));
};

let clearData = () => {
    document.getElementById("moviesList").innerHTML = "";
};

let emptyPage = () => {
    let content = document.getElementById('moviesList');
    if (content.childNodes.length === 0) {
        let nextPage = document.getElementById('nextPage');
        nextPage.style.display = 'none';
        let errorMesage = document.createElement('h3');
        errorMesage.setAttribute('id', 'errorMesage');
        errorMesage.innerHTML = "Nothing to display!";
        content.append(errorMesage);
    }
    else {
        nextPage.style.display = 'flex';
        return;
    }
};

runFilter(urlConstructor(showInputsValue));