import {createElement} from '../render.js';
import {formatDate, humanizeDate, getDuration} from '../utils.js';

const createFilmDetailsInnerTemplate = (film, comments) => {

  const getReleaseDate = (date) => formatDate(date, 'D MMMM YYYY');

  const createGenresTemplate = () => (
    `<tr class="film-details__row">
       <td class="film-details__term">${film.filmInfo.genre.length > 1 ? 'Genres' : 'Genre'}</td>
       <td class="film-details__cell">
            ${film.filmInfo.genre.map((item) =>
      `<span class = "film-details__genre" >${item}</span>`).join('')}
      </td>
    </tr>`
  );

  const createGenres = createGenresTemplate();

  const checkedWatchlist = film.userDetails.watchlist === true
    ? 'film-details__control-button--active'
    : '';

  const checkedWatched = film.userDetails.alreadyWatched === true
    ? 'film-details__control-button--active'
    : '';

  const checkedFavorite = film.userDetails.favorite === true
    ? 'film-details__control-button--active'
    : '';

  const createCommentsTemplate = () => {

    const getCommentDate = (date) => humanizeDate(date);

    return (`<ul class="film-details__comments-list">
    ${comments.filter((item) => film.comments.includes(item.id)).map((item) =>
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${item.emotion}.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${item.comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${item.author}</span>
              <span class="film-details__comment-day">${getCommentDate(item.date)}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
      </li>`).join('')}
    </ul>`);
  };

  const createComments = film.comments.length > 0 ? createCommentsTemplate() : '';

  return (
    `<form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${film.filmInfo.poster}" alt="">

          <p class="film-details__age">${film.filmInfo.ageRating.toString()}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.filmInfo.alternativeTitle}</h3>
              <p class="film-details__title-original">Original: ${film.filmInfo.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.filmInfo.writers.join(',')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.filmInfo.actors.join(',')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getReleaseDate(film.filmInfo.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getDuration(film.filmInfo.runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.filmInfo.release.releaseCountry}</td>
            </tr>
            ${createGenres}
          </table>

          <p class="film-details__film-description">${film.filmInfo.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${checkedWatchlist}"
                id="watchlist" name="watchlist">Add to watchlist
        </button>
        <button type="button"
                class="film-details__control-button film-details__control-button--watched ${checkedWatched}"
                id="watched" name="watched">Already watched
        </button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${checkedFavorite}"
                id="favorite" name="favorite">Add to favorites
        </button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span>
        </h3>
        ${createComments}
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                name="comment">
            </textarea>
          </label>

          <div class="film-details__emoji-list">

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                   id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                   id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                   id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                   id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>`);
};

export default class FilmDetailsInnerView {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createFilmDetailsInnerTemplate(this.film, this.comments);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
