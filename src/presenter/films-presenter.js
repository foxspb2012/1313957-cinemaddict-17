import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmView from '../view/film-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmRatedView from '../view/films-rated-view.js';
import FilmCommentedView from '../view/films-commented-view.js';
import {render} from '../render.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsContainerComponent = new FilmsContainerView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsContainerComponent, this.filmsListComponent.getElement());

    for (let i=0; i<5; i++) {
      render(new FilmView(), this.filmsContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());
    render(new FilmRatedView(), this.filmsComponent.getElement());
    render(new FilmCommentedView(), this.filmsComponent.getElement());
  };
}


