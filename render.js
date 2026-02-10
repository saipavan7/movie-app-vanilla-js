import { isFavourite, toggleFavourites } from "./favourites.js";

export function renderMovies(movies) {
  const results = document.querySelector("#results");
  results.innerHTML = "";

  console.log(movies);
  if (!movies || movies.length === 0) {
    results.innerHTML = "<p>No movies found</p>";
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // store imdbID for click handling
    card.dataset.imdbid = movie.imdbID;

    card.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    results.appendChild(card);
    results.classList.add("movie-list");
  });
}

export function renderMovieDetails(movie) {
  const detailsContainer = document.querySelector("#results");

  //Determine favourite state
  const favText = isFavourite(movie.imdbId)
    ? "Remove from favourites"
    : "Add to Favourites";

  detailsContainer.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" />
    <h2>${movie.Title}</h2>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Rating:</strong> ${movie.imdbRating}</p>
    <p>${movie.Plot}</p>
    <button id="fav-btn">${favText}</button>
    <button id="back-btn">Back</button>
  `;

  //Add click listener for favourite button
  document.querySelector("#fav-btn").addEventListener("click", () => {
    toggleFavourites(movie.imdbId);
    renderMovieDetails(movie);
  });

  //back button
  document.querySelector("#back-btn").addEventListener("click", () => {
    document.querySelector("#details-view").style.display = "none";
    document.querySelector("#search-view").style.display = "block";
  });
}
