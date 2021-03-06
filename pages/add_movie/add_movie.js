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
  "#submit",
  "#login",
]);

const [
  typeInput,
  titleInput,
  genreInput,
  yearInput,
  runtimeInput,
  countryInput,
  languageInput,
  posterInput,
  imdbRatingInput,
  imdbVotesImput,
  imdbIDImput,
  submitBtn,
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

  fetch("https://movies-app-siit.herokuapp.com/movies", {
    method: "POST",
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

loginBtn.addEventListener("click", handleLogin);
submitBtn.addEventListener("click", handleAddMovies);
