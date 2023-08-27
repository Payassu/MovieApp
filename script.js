const MOVIES_API = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query="';
const IMAGE_API = 'https://image.tmdb.org/t/p/w500';

const form = $('#form');
const search = $('#search');
const main = $('#main');

const APIcredentials = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTZhODRiNmI0NmJkMDIxMWZhNWY3MzJmYTVjMjAwZiIsInN1YiI6IjY0ZTdlMmI0ZTg5NGE2MDEzYmFmZjNhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AbIZCl2Qilbd9VBa0iJtVtCn3jHDEDxHQZHDRK7Ay0k'
  }
}

async function getMovies(url, credentials){
  const response = await fetch(url, credentials);
  const data = await response.json();
  console.log(data.results);
  showMovies(data.results);
}

// -> same, but different
// const getMovies = (url, credentials) => {
//   fetch(url, credentials)
//   .then(response => response.json())
//   .then(response => showMovies(response.results))
//   .then(response => console.log(response.results))
//   .catch(() => console.log('function getMovies failed execution'));
// }

function showMovies(movies){
  main.empty(); //deletes all child elements from 'main'

  movies.forEach((movie) => {

    //destructure json object received in fetch()
    const {title, poster_path, vote_average, overview} = movie;
    
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie'); // adding class="movie" to the div

    movieCard.innerHTML = `
      <img src="${IMAGE_API + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average.toFixed(2))}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    main.append(movieCard);
  })
}

function getClassByRate (vote){
  if(vote >= 8){
    return 'green';
  } else if(vote >= 5){
    return 'orange';
  } else{
    return 'red';
  }
}

$(window).load(getMovies(MOVIES_API, APIcredentials));

form.on('submit', (e) => {
  e.preventDefault();
  let searchResult = search.val();

  if(searchResult && searchResult !== ''){
    getMovies(SEARCH_API+searchResult, APIcredentials);
    console.log(searchResult);
    searchResult = '';
  } else{
    console.log('something went wrong with the search');
    window.location.reload();
  }
})
