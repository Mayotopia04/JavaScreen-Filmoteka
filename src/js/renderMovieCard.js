import templateProcessor from './templateProcessor';
import { GENRES } from './config';
// to render genre name value in modal of movie-card-with-buttons
export let genre_names; 

class RenderMovieCard {
  render(options) {
    let genres = options.genre_ids.map(g => GENRES[g]);
    let genreNames = genres.join(', ');
    const templateHtml = `<div
  class="col-lg-4 col-md-6 col-sm-12 movie-card"
  data-movie-id="{{id}}"
  data-bs-toggle="modal"
  data-bs-target="#movie-details-modal"
>
  <img src="{{poster_path}}" class="poster-border img-width"/>
  <h3 class="movie-card-title">{{original_title}}</h3>
  <p><span class="movie-card-details">{{genre_names}} | {{release_year}} </span> <span class="vote-average"> {{vote_average}}</span></p>
</div>
`;

    options.genre_names = genreNames;
    genre_names = options.genre_names;
    options.poster_path = (options.poster_path) ? `https://image.tmdb.org/t/p/w342${options.poster_path}` : 'https://cdn.vectorstock.com/i/1000x1000/88/26/no-image-available-icon-flat-vector-25898826.webp';
    const releaseDate = options.release_date;
    const releaseYear = releaseDate.split('-')[0];

    options.release_year = releaseYear;

    return templateProcessor.replaceValues(templateHtml, options);
  }
}

export default new RenderMovieCard();
