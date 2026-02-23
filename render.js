import { getFavourites, isFavourite, toggleFavourites } from "./favourites.js";
import { renderHome } from './main.js';

export function renderMovies(movies , container) {

  container.innerHTML = "";
  console.log(movies, container);

  if (!movies || movies.length === 0) {
    container.innerHTML = "<p>No movies found</p>";
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
  });
  console.log(searchResultsCard);
   container.appendChild(searchResultsCard);
}

export function renderMovieDetails(movie) {
  const detailsContainer = document.querySelector("#details-section");

  console.log('render Movie Details called');

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
    </div>
  `;

   // Add click listener for favourite button
  document.querySelector("#fav-btn").addEventListener("click", () => {
    console.log("triggered positive");
    toggleFavourites(movie);
    renderMovieDetails(movie);
  });


}
