import MovieDbApi from './api';
import { DETAILS_OPTION } from './config';
import renderMovieCard from './renderMovieCard';
import renderMovieDetails from './renderMovieDetails';
import { setupMovieCardOnClick } from '..';

class RenderLibrary {

  async render(localStorageKey) {
    console.log(localStorageKey);
    //  Call API to get trending movies
    const moviesText = localStorage.getItem(localStorageKey);
    let movies = [];
    if (moviesText) {
      movies = JSON.parse(moviesText);
    }

    let moviesHtml = '';

    //  movies.data.results
    //  Iterate through each movie results
    let count = 0;
    movies.forEach((movie) => {
      // const movieHtml=  RenderMovieCard.render(movie);

      moviesHtml = moviesHtml + renderMovieCard.render(movie);
      count++;
    });
    document.getElementById('content').innerHTML = moviesHtml;
    setupMovieCardOnClick();
  }

  /* setupMovieCardOnClick() {
    const movieCardLinks = document.getElementsByClassName('movie-card');
    for (const movieCardLink of movieCardLinks) {
      movieCardLink.onclick = async function(ev) {
        const movieId = ev.currentTarget.getAttribute('data-movie-id');
        //  call movie api to get details of movieId
        const response = await MovieDbApi.getMovieDetails(movieId);
        // console.log(response);
        //  pass the response of the movie details api to RenderMovieDetails
        renderMovieDetails.render(response.data);

        let addToWatchedBtn = document.getElementById('add-to-watched-btn');
        let addToQueueBtn = document.getElementById('add-to-q-btn');
        addToWatchedBtn.onclick = function(e) {

          // get item if it exists in localStorage
          let watchedMoviesText = localStorage.getItem('watchedMovies');
          let watchedMovies = [];
          if (watchedMoviesText) {
            watchedMovies = JSON.parse(watchedMoviesText);
          }

          let movieInfo = {
            id: response.data.id,
            poster_path: response.data.poster_path,
            original_title: response.data.original_title,
            vote_average: response.data.vote_average,
            genre_ids: response.data.genres.map(g => g.id),
            release_date: response.data.release_date,

          };

          // watchedMovies.push(movieInfo);
          watchedMovies = watchedMovies.map(watched=>{
            if(watched.id === movieInfo.id){
              watched = {
                ...watched,
                movieInfo,
              }
            }
            return watched;
          })

          localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
          console.log(watchedMovies);
        };


        addToQueueBtn.onclick = function(e) {

          let queuedMoviesText = localStorage.getItem('queuedMovies');
          let queuedMovies = [];
          if (queuedMoviesText) {
            queuedMovies = JSON.parse(queuedMoviesText);
          }
          
          let movieInfo = {
            id: response.data.id,
            poster_path: response.data.poster_path,
            original_title: response.data.original_title,
            vote_average: response.data.vote_average,
            genre_ids: response.data.genres.map(g => g.id),
            release_date: response.data.release_date,

          };
          queuedMovies = queuedMovies.map(queue=>{
            if(queue.id === movieInfo.id){
              queue = {
                ...queue,
                movieInfo,
              }
            }
            return queue;
          })
          
          console.log(queuedMovies);

          localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
        };
      };
    }
  } */
}

export default new RenderLibrary();