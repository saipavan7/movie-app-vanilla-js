import { fetchMoviesBySearch, fetchMovieByID } from "./api.js";
import { getFavourites } from "./favourites.js";
import { renderMovieDetails, renderMovies } from "./render.js";

export const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const results = document.querySelector("#results-section");
const viewFavs = document.querySelector("#favourites-section");

//ON CLIKC OF SUBMIT , CALL THE API AND FETCH MOVIES

console.log(form);
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  

  const query = input.value.trim();
  if (!query) return;
  try {
    results.innerHTML = "Loading...";
    const moviesData = await fetchMoviesBySearch(query);
    if (moviesData.Response === "False") {
      results.innerHTML = `<p>No movies found 😢</p>`;
      return;
    }

    results.innerHTML = "";
    renderMovies(moviesData.Search);
  } catch (error) {
    results.innerHTML = "Something went wrong 😢";
    console.error(error);
  }
});

//event listenig button click (movie selected) and fetch details from API
results.addEventListener("click", async (e) => {
  const movieCard = e.target.closest(".movie-card");
  console.log("clicked onmovie", movieCard);

  if (!movieCard) return;

  const imdbId = movieCard.dataset.imdbid;
  console.log(imdbId);

  results.innerHTML = `<h4>loading Movie Details.....</h4>`;

  try {
    const movieDetails = await fetchMovieByID(imdbId);
    console.log(movieDetails);

    renderMovieDetails(movieDetails);
  } catch (error) {
    console.error(error);
    results.innerHTML = "Failed to load movie 😢";
  }
});


//event function to trigger on click of view favourites
viewFavs.addEventListener('click', async ()=>{

  const favs = getFavourites();

  favs.forEach(fav => {


    
  });

 


    
  })

