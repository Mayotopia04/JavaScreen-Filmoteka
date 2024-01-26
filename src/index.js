import renderHome from "./js/renderHome";
import MovieDbApi from './js/api';
//  Import config
import {CONTENT_KEYS} from "./js/config";
import renderMovieDetails from "./js/renderMovieDetails";
import renderLibrary from "./js/renderLibrary";
import { DETAILS_OPTION } from "./js/config";
import renderPagination from './js/renderPagination';

//  Instantiate global variables here
export let currentContent =  CONTENT_KEYS.home;

window.onload = async function () {
  await renderComponents();

  setupEventListeners();

}

//  Render all components
//  Header, Content, Footer
async function renderComponents() {

  const path = window.location.pathname;
  const page = path.split("/").pop();

  if (page === 'library.html') {
    //  Library
    //  No pagination
    await renderLibrary.render('watchedMovies');
  } else {
    //  Home
    //  Displays trending movies
    //  Render pagination also
    await renderHome.render({page: 1});
  }

}



//  Setup event listeners
//  Create a function for each type
function setupEventListeners() {

  setupMovieCardOnClick();
  
  // setUpLibraryButtons();
}

export function setupMovieCardOnClick() {
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
            watchedMovies.splice(index,1);
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
            queuedMovies.splice(index,1);
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


// function setUpLibraryButtons() {
 
// }

// Sir Jeremy footer modal
const studentModal = document.querySelector("#jeremy-modal");
studentModal.addEventListener('click', jeremyModal);

const studentDev = document.querySelector("#dev");
studentDev.addEventListener('click', onDev);

function onDev(event) {
  if (event.target.nodeName !== "IMG") {
    return; 
  }

  document.getElementById("img01").src = event.target.src;
  document.getElementById("modal01").style.display = "block";
}

function jeremyModal() {
  document.querySelector("#dev").classList.toggle("is-hidden");
}

