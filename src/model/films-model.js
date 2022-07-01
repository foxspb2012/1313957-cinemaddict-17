import {generateFilm} from '../mock/film.js';
import {comments} from '../mock/comments.js';

export default class FilmsModel {
  films = Array.from({length:10}, generateFilm);

  getFilms = () => this.films;
  getComments = () => comments;
}
