const apiKey = "b98a4814";
const baseUrl = "http://www.omdbapi.com";

export async function fetchMovieByID(imdbId) {
  const res = await fetch(`${baseUrl}?apiKey=${apiKey}&i=${imdbId}`);
  return res.json();
}

export async function fetchMoviesBySearch(query) {
  const res = await fetch(`${baseUrl}?apiKey=${apiKey}&s=${query}`);
  return res.json();
}
