const baseURL = "https://movies-app-siit.herokuapp.com/movies/";
const moveiId = location.search.substring(4);

const components = document.querySelectorAll([
  "#title",
  "#type",
  "#genre",
  "#year",
  "#runtime",
  "#country",
  "#language",
  "#poster",
  "#imdbRating",
  "#imdbVotes",
  "#imdbID",
  "#update",
  "#delete",
  "#login",
]);

const [
  titleInput,
  typeInput,
  genreInput,
  yearInput,
  runtimeInput,
  countryInput,
  languageInput,
  posterInput,
  imdbRatingInput,
  imdbVotesImput,
  imdbIDImput,
  updateBtn,
  deleteBtn,
  loginBtn,
] = components;

let data = {
  username: "RazvanTest5",
  password: "password",
};
let loginToken;

//let token = localStorage.getItem("token")

const handleAddMovies = () => {
  let data = {
    Title: titleInput.value,
    Year: yearInput.value,
    Runtime: runtimeInput.value,
    Genre: genreInput.value,
    Language: languageInput.value,
    Country: countryInput.value,
    Poster: posterInput.value,
    imdbRating: imdbRatingInput.value,
    imdbVotes: imdbVotesImput.value,
    imdbID: imdbIDImput.value,
    Type: typeInput.value,
  };
  if (
    data.Title === "" ||
    data.Year === "" ||
    data.Runtime === "" ||
    data.Genre === "" ||
    data.Language === "" ||
    data.Country === "" ||
    data.Poster === "" ||
    data.imdbRating === "" ||
    data.imdbVotes === "" ||
    data.imdbID === "" ||
    data.Type === ""
  ) {
    alert("Please enter all data of your movie!");
    return;
  }

  fetch(baseURL + moveiId, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      "X-Auth-Token": loginToken,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => console.log(err));
};

const handleLogin = () => {
  console.log("Login Started");
  fetch("https://movies-app-siit.herokuapp.com/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Login Successful", json);
      loginToken = json.accessToken;
    })
    .catch((err) => console.log(err));
};

const deleteMovie = () => {
  const shouldDeleteMovie = confirm(
    "You choose to delete this movie, are you sure?"
  );
  if (shouldDeleteMovie) {
    fetch(baseURL + moveiId, {
      headers: {
        "X-Auth-Token": loginToken,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
      })
      .then((json) => {
        console.log(json);
        window.location = "./../home/home.html";
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const getMovies = () => {
  fetch(baseURL + moveiId, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      const movie = json;
      titleInput.value = json.Title;
      posterInput.value = json.Poster;
      yearInput.value = json.Year;
      runtimeInput.value = json.Runtime;
      genreInput.value = json.Genre;
      imdbRatingInput.value = json.imdbRating;
      imdbVotesImput.value = json.imdbVotes;
      languageInput.value = json.Language;
      countryInput.value = json.Country;
      imdbID.value = json.imdbID;
      typeInput.value = json.Type;
      console.log(movie);
    });
};
getMovies();

loginBtn.addEventListener("click", handleLogin);
updateBtn.addEventListener("click", handleAddMovies);
deleteBtn.addEventListener("click", deleteMovie);
