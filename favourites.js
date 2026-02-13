//Get the favourited from local storage
export function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}
//save the favourites onto local storage
export function saveFavourites(favourites) {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

//Toggle a movie in favourites
export function toggleFavourites(movie) {
  let favourites = getFavourites();
  console.log(movie);
  console.log(favourites);

  // if (favourites.includes(imdbId)) {
  //   favourites = favourites.filter((fav) => fav !== imdbId);
  // } else {
  //   favourites.push(imdbId);
  // }

  const exits = favourites.some(mov => mov.imdbID === movie.imdbID);

  if(!exits){
    favourites.push(movie);
  }
  else{
    favourites = favourites.filter((fav) => fav.imdbID !== movie.imdbID);
  }

  saveFavourites(favourites);
  console.log(favourites);
  return favourites;
}

//check if a movie in favourites
export function isFavourite(imdbId) {
  const favourites = getFavourites();
  return favourites.some(mov => mov.imdbID === imdbId);
}
