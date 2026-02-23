import { fetchMoviesBySearch, fetchMovieByID } from "./api.js";
import { getFavourites } from "./favourites.js";
import { renderMovieDetails, renderMovies } from "./render.js";

export const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");

const results = document.querySelector("#results-section");
const details = document.querySelector('#details-section');
const favSection = document.querySelector("#favourites-section");

const viewFavs = document.querySelector("#view-favourites");
const backBtn = document.querySelector('#back-button');



let currentScreen = 'Home';
let prevScreen = null;

let screenResults = [];
let searchQuery = '';

//ON CLIKC OF SUBMIT , CALL THE API AND FETCH MOVIES
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  console.log("submit event triggered");

  searchQuery = input.value.trim();
  if (!searchQuery) return;
  try {
    results.innerHTML = "Loading...";
    const moviesData = await fetchMoviesBySearch(searchQuery);
    if (moviesData.Response === "False") {
      results.innerHTML = `<p>No movies found 😢</p>`;
      return;
    }

    results.innerHTML = "";
    screenResults = moviesData.Search;
    renderMovies(moviesData.Search , results);
  } catch (error) {
    results.innerHTML = "Something went wrong 😢";
    console.error(error);
  }
});

//event listening button click (movie selected) and fetch details from API
results.addEventListener("click", onMovieCardClick);
favSection.addEventListener("click", onMovieCardClick);

  async function onMovieCardClick(e){
  const movieCard = e.target.closest(".movie-card");
  console.log("clicked on movie for movie Details ", movieCard);

  if (!movieCard) return;

  const imdbId = movieCard.dataset.imdbid;
  console.log(imdbId);

  results.innerHTML = `<h4>loading Movie Details.....</h4>`;

  try {
    const movieDetails = await fetchMovieByID(imdbId);
    console.log(movieDetails);

    prevScreen = currentScreen;
  currentScreen = 'Details';
      backBtn.classList.remove('hidden');
    renderMovieDetails(movieDetails);
    form.style.display = "none";
     results.style.display = "none";
     favSection.style.display = "none";
     details.style.display = "block";
  } catch (error) {
    console.error(error);
    results.innerHTML = "Failed to load movie 😢";
  }
}



//event function to trigger on click of view favourites
viewFavs.addEventListener('click', async ()=>{

  renderFavourites();
 
  })


  backBtn.addEventListener('click', async ()=>{

    if(prevScreen === 'Favs'){
     renderFavourites();
    }
    else if (prevScreen === 'Home'){
    renderHome();
    }
    else if(prevScreen === 'Details'){
      renderHome();
    }
  });

  //Land on Home Screen
  export function renderHome(){

    //hide back button since this is home screen
    backBtn.classList.add('hidden');

   prevScreen =  currentScreen ;
   currentScreen = 'Home';

   form.style.display = "block";
   results.style.display = "block";
   favSection.style.display = "none";
   details.style.display = "none";

   if(screenResults.length>0){
    renderMovies(screenResults , results);
   }

  }


  //Initiate renderFavs
  export function renderFavourites(){

    backBtn.classList.remove('hidden');

      prevScreen = currentScreen;
  currentScreen = 'Favs';

  console.log("Favourites button clicked");
  renderMovies(getFavourites() , favSection);
    form.style.display = "none";
   results.style.display = "none";
   favSection.style.display = "block";
   details.style.display = "none";


  }