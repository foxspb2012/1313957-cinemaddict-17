import dayjs from 'dayjs';
import {DESCRIPTION_LENGTH} from '../const.js';
import {getDuration} from '../utils.js';
import {createElement} from '../render.js';

const createFilmTemplate = (film) => {

  const getFilmInfo = () => {

    const yearRelease = (info) => dayjs(info.release.date).year();
    const duration = (info) => getDuration(info.runtime);
    const genre = (info) => info.genre[0];

    return (
      `<p class="film-card__info">
        <span class="film-card__year">${yearRelease(film.filmInfo)}</span>
        <span class="film-card__duration">${duration(film.filmInfo)}</span>
        <span class="film-card__genre">${genre(film.filmInfo)}</span>
      </p>`
    );
  };

  const getDescription = (description) => description.length > 140 ? description.slice(0, DESCRIPTION_LENGTH - 1).concat('...') : description;

  const checkedWatchlist = film.userDetails.watchlist === true
    ? 'film-card__controls-item--active'
    : '';

  const checkedWatched = film.userDetails.alreadyWatched === true
    ? 'film-card__controls-item--active'
    : '';

  const checkedFavorite = film.userDetails.favorite === true
    ? 'film-card__controls-item--active'
    : '';

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${film.filmInfo.title}</h3>
        <p class="film-card__rating">${film.filmInfo.totalRating}</p>
        ${getFilmInfo(film.filmInfo)}
        <img src="./images/posters/${film.filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${getDescription(film.filmInfo.description)}</p>
        <span class="film-card__comments">${film.comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${checkedWatchlist}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${checkedWatched}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${checkedFavorite}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmTemplate(this.film);
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
