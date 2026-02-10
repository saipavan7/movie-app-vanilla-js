//Get the favourited from local storage
export function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}
//save the favourites onto local storage
export function saveFavourites(favourites) {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

//Toggle a movie in favourites
export function toggleFavourites(imdbId) {
  let favourites = getFavourites();

  if (favourites.includes(imdbId)) {
    favourites = favourites.filter((fav) => fav !== imdbId);
  } else {
    favourites.push(imdbId);
  }

  saveFavourites(favourites);
  return favourites;
}

//check if a movie in favourites
export function isFavourite(imdbId) {
  const favourites = getFavourites();
  return favourites.includes(imdbId);
}
