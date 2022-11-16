export async function getMovies(title, year, page) {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&y=${year}&page=${page}`);
  const { Search: movies, totalResults: total } = await res.json();
  return { movies, total };
}