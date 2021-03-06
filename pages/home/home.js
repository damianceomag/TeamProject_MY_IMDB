var url = "https://movies-app-siit.herokuapp.com/movies";

//Functia de fetch a listei de filme:
function getMovies() {
    fetch(url)
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (jsonResponse) {
            showMovies(jsonResponse);
        }).catch(function (error) {
            console.log('Error: ', error);
        });
}


// 2. Afisarea filmelor in sectiunea "All Movies":
var showMovies = (moviesList) => createMovies(moviesList);

//3. Slider cu schimbare de imagine automata si cu butoane pentru schimbare de imagine manuala:
var slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, 5000); // Schimbare la 5 sec
}


//4. Scroll din butoane pentru All Movies:
function scrollButtons() {
    let leftButton = document.getElementById('leftArrow');
    let rightButton = document.getElementById('rightArrow');

    let movieList = document.getElementById('moviesList');

    leftButton.onclick = function () {
        movieList.scrollLeft -= 1000;
    }

    rightButton.onclick = function () {
        movieList.scrollLeft += 1000;
    }
}

showSlides();
getMovies();
scrollButtons();

