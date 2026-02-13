import { isFavourite, toggleFavourites } from "./favourites.js";
import { form } from './main.js';

export function renderMovies(movies) {
  const results = document.querySelector("#results-section");
  results.innerHTML = "";
  console.log('CLEARED');

  console.log(movies);

  if (!movies || movies.length === 0) {
    results.innerHTML = "<p>No movies found</p>";
    return;
  }
  const searchResultsCard = document.createElement("div");
   searchResultsCard.classList.add("movie-list");
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

    searchResultsCard.appendChild(card);
    results.appendChild(searchResultsCard);
  });
}

export function renderMovieDetails(movie) {
  const detailsContainer = document.querySelector("#details-section");

  //Determine favourite state
  const favText = isFavourite(movie.imdbID)
    ? "Remove from favourites"
    : "Add to Favourites";

  detailsContainer.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" />
    <div>
    <h2>${movie.Title}</h2>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Rating:</strong> ${movie.imdbRating}</p>
    <p>${movie.Plot}</p>
    <button id="fav-btn">${favText}</button>
    <button id="back-btn">Back</button>
    </div>
  `;


   // Add click listener for favourite button
  document.querySelector("#fav-btn").addEventListener("click", () => {
    console.log("triggered positive");
    toggleFavourites(movie);
    renderMovieDetails(movie);
  });


  //back button
  document.querySelector("#back-btn").addEventListener("click", () => {
    // document.querySelector("#details-view").style.display = "none";
    // document.querySelector("#search-view").style.display = "block";
// const form = document.querySelector('#search-form');
    // trigger last search again
    form.dispatchEvent(new Event("submit"));
  });

}
