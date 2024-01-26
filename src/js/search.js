import MovieDbApi from './api';
import renderSearch from './renderSearch';
import renderMovieDetails from './renderMovieDetails';
import renderPagination from './renderPagination';
import { CONTENT_KEYS } from './config';
import { DETAILS_OPTION } from './config';

let searchButton = document.getElementById('search-button');
// async call for API


//  capture the search texts
//  call search API with search texts
//  render the  results in the page
searchButton.onclick = async function (e) {
    e.preventDefault();
    const searchField = document.getElementById('search-input');
    await renderSearch.render({text: searchField.value,page:1});
    setupMovieCardOnClick();
    // document.getElementById('pagination').innerHTML = '';
    
}

function setupMovieCardOnClick() {
    const movieCardLinks = document.getElementsByClassName("movie-card");
    for (const movieCardLink of movieCardLinks) {
      movieCardLink.onclick = async function (ev) {
        const movieId = ev.currentTarget.getAttribute("data-movie-id");
        //  call movie api to get details of movieId
        const response = await MovieDbApi.getMovieDetails(movieId);
        // console.log(response);
        //  pass the response of the movie details api to RenderMovieDetails
        renderMovieDetails.render(response.data);

        let addToWatchedBtn = document.getElementById('add-to-watched-btn');
      let addToQueueBtn = document.getElementById('add-to-q-btn');

      let watchedMoviesText = localStorage.getItem("watchedMovies");
      let watchedMovies = [];
        if (watchedMoviesText) {
          watchedMovies = JSON.parse(watchedMoviesText);
        }

        addToWatchedBtn.textContent = `${DETAILS_OPTION.default} TO WATCHED`;

        for (const {id} of watchedMovies) {
          // console.log(parseInt(movieId));
          if(id === parseInt(movieId)){
            addToWatchedBtn.classList.add('active');
            addToWatchedBtn.textContent = `${DETAILS_OPTION.remove} FROM WATCHED LIST`;
          }
        }


      let queuedMoviesText = localStorage.getItem("queuedMovies");

      let queuedMovies = [];
        if (queuedMoviesText) {
          queuedMovies = JSON.parse(queuedMoviesText);
        }

        addToQueueBtn.textContent = `${DETAILS_OPTION.default} TO QUEUED`;

        for (const {id} of queuedMovies) {
          // console.log(parseInt(movieId));
          if(id === parseInt(movieId)){
            addToQueueBtn.classList.add('active');
            addToQueueBtn.textContent = `${DETAILS_OPTION.remove} FROM QUEUED LIST`;
          }
        }
     

      addToWatchedBtn.onclick = function (e) {

        // get item if it exists in localStorage

        let movieInfo = {
          id: response.data.id,
          poster_path: response.data.poster_path,
          original_title: response.data.original_title,
          vote_average: response.data.vote_average,
          genre_ids: response.data.genres.map(g => g.id),
          release_date: response.data.release_date

        }

        let index = 0;
        for(const {id} of watchedMovies){
          if(id === movieInfo.id){
            watchedMovies.splice(index);
            localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
            return;
          }
          index++;
        }

        watchedMovies.push(movieInfo);
        e.currentTarget.textContent = `${DETAILS_OPTION.remove} TO QUEUED`;
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        // console.log(watchedMovies);
      }



      addToQueueBtn.onclick = function (e) {

        let movieInfo = {
          id: response.data.id,
          poster_path: response.data.poster_path,
          original_title: response.data.original_title,
          vote_average: response.data.vote_average,
          genre_ids: response.data.genres.map(g => g.id),
          release_date: response.data.release_date

        }

        let index = 0;
        for(const {id} of queuedMovies){
          if(id === movieInfo.id){
            queuedMovies.splice(index);
            localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
            return;
          }
          index++;
        }


        queuedMovies.push(movieInfo);
        localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
      }
    };
  }
}



