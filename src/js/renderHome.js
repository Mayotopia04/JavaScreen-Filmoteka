import MovieDbApi from './api';
import renderMovieCard from './renderMovieCard';
import renderPagination from './renderPagination';
import renderMovieDetails from './renderMovieDetails';
import { Notify } from 'notiflix';
// import { paging } from './library-buttons';

export const pagingButton = document.querySelector('.pagination-container');

class RenderHome {
  // declaring object global variable
  pageOptions = {}

  // function handler for event
  pagingEvent = (e) => {
    // console.log(parseInt(e.target.dataset.index));
      // using switch() condition method
      switch(parseInt(e.target.dataset.index)){
        // 1st case is previous
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
          if(parseInt(this.pageOptions.page) > 20){
            this.pageOptions.page = 20;
            Notify.failure('Reached maximum page!!!',{
              position:'center-center',
            });
          }
          break; /* this.render({page:data.page + 1,text:options.text}) */;
        // default is the selected number from button
        default:
          this.pageOptions.page = e.target.dataset.index;
          // this.render({page:e.target.dataset.index,text:options.text});
      }
      // stop mutation of event click
      pagingButton.removeEventListener('click',this.pagingEvent);
      // rendering new data(page)
      this.render({page:this.pageOptions.page});
  }

  async render(options) {
    // console.log('option content:',options);
    //  Call API to get trending movies
    const {data} = await MovieDbApi.getTrendingMovies('day', options.page);

    pagingButton.innerHTML = '';
    // console.log(data);
    // recieving value data from api
    this.pageOptions = data;
    let trendingMoviesHtml = '';
    //  movies.data.results
    //  Iterate through each movie results
    data.results.map((movie) => {
      // const movieHtml=  RenderMovieCard.render(movie);

      trendingMoviesHtml = trendingMoviesHtml + renderMovieCard.render(movie);
    });
    document.getElementById('content').innerHTML = trendingMoviesHtml;
    const total_pages = (data.total_pages >= 20)? 20 : data.total_pages;
    // console.log(total_pages);
    pagingButton.insertAdjacentHTML('beforeend',`
    <button class="page-arrow pagination-button last-button" data-index="-1"><</button>
    ${renderPagination.render(data.page, total_pages)}
    <button class="page-arrow pagination-button arrow-right" data-index="21">></button>
    `);
    // calling object function
    this.setupMovieCardOnClick();
    // render event click
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

          watchedMovies.push(movieInfo);

          localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
          console.log("render home add to watched",watchedMovies);
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

          queuedMovies.push(movieInfo);

          localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
        };
      };
    }
  }
}

export default new RenderHome();