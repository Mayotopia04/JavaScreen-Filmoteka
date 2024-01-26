import MovieDbApi from './api';
import renderMovieCard from './renderMovieCard';
import renderPagination from './renderPagination';
import renderMovieDetails from './renderMovieDetails';
import { CONTENT_KEYS } from './config';
import { currentContent } from '..';
import { pagingButton } from './renderHome';
import { Notify } from 'notiflix';
import renderHome from './renderHome';
import { setupMovieCardOnClick } from '..';

// import { paging } from './library-buttons';

class RenderSearch {
  // declaring pageOptions Globally in object
  pageOptions = {}

  // function handler for this object
  pagingEvent = (e) => {
    // console.log(this.pageOptions.total_pages);
    // console.log(parseInt(e.target.dataset.index));

      // selecting case from previous page and selected page
      // until to next page
      switch(parseInt(e.target.dataset.index)){
        // first case is previous
        case -1:
          this.pageOptions.page -= 1;
          if(parseInt(this.pageOptions.page) < 1){
            this.pageOptions.page = 1;
            Notify.failure('Reached minimum page!!!',{
              position:'center-center',
            });
          }
          break; /* this.render({page:data.page - 1,text:options.text}) */;
        // 2nd case is next
        case 21:
          this.pageOptions.page += 1;
          if(parseInt(this.pageOptions.page) > this.pageOptions.total_pages){
            this.pageOptions.page = this.pageOptions.total_pages;
            Notify.failure('Reached maximum page!!!',{
              position:'center-center',
            });
          }
          break; /* this.render({page:data.page + 1,text:options.text}) */;
        // default is for selected number or page
        default:
          this.pageOptions.page = e.target.dataset.index;
          console.log('numbers');
          // this.render({page:e.target.dataset.index,text:options.text});
      }
      // removing event mutation 
      pagingButton.removeEventListener('click',this.pagingEvent);
      // rendering new options(text,page)
      this.render({text:this.pageOptions.text,page:this.pageOptions.page});
  }

    async render(options) {
        // removeEventListener('click', pagingButton);
        // console.log('start search rendering',options);
        // currentContent = CONTENT_KEYS.search;  
        //  Call API to get trending movies
        // console.log(options.text);
        const { data } = await MovieDbApi.searchMovies(options.text,options.page);
        let searchMatchHTML = '';
        // clearing all nodes and texts
        pagingButton.innerHTML = '';
        this.pageOptions = {
          ...this.pageOptions, // spreading current pageOptions
          ...options, // spreading option parameter
          total_pages:data.total_pages, // overwriting the current total_pages
          page:data.page, // overwriting the current page
        }
        //  movies.data.results
        //  Iterate through each movie results
        // console.log(movies);
        data.results.map((movie) => {
            // const movieHtml=  RenderMovieCard.render(movie);
            
            searchMatchHTML = searchMatchHTML + renderMovieCard.render(movie);
        });
        document.getElementById('content').innerHTML = searchMatchHTML;
        // variable holder for total pages.
        const total_pages = /* (data.total_pages >= 20)? 20 : */ data.total_pages;
    // console.log(total_pages);
    // rendering button pagination
    pagingButton.insertAdjacentHTML('beforeend',`
    <button class="page-arrow pagination-button last-button" data-index="-1"><</button>
    ${renderPagination.render(data.page, total_pages)}
    <button class="page-arrow pagination-button arrow-right" data-index="21">></button>
    `);
    // stop rendering renderHome Oject
    // named setupMovieCardOnclick
    // renderHome.setupMovieCardOnClick = null;
    // function object call
    // using this method
    // this.setupMovieCardOnClick();
    setupMovieCardOnClick();
    // remove home rendered click button/
    // to stop mutation
    pagingButton.removeEventListener('click', renderHome.pagingEvent);
    // pagination event target by button next, button previous
    // and button selected number
    pagingButton.addEventListener('click', this.pagingEvent);
    }

    setupMovieCardOnClick() {
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
}

export default new RenderSearch();