import {render,RenderPosition} from '../render.js';
import FilmView from '../view/film-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListRatedComponent = new FilmsListExtraView('Top rated');
  filmsListCommentedComponent = new FilmsListExtraView('Most commented');
  filmsContainerComponent = new FilmsContainerView();
  filmsRatedContainerComponent = new FilmsContainerView();
  filmsCommentedContainerComponent = new FilmsContainerView();

  init = (filmsContainer, filmsModel) => {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.filmsList = [...this.filmsModel.getFilms()];
    this.filmsListRated = [...this.filmsModel.getFilms()].filter((item) => item.filmInfo.totalRating > 0)
      .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0, 2);
    this.filmsListCommented = [...this.filmsModel.getFilms()].filter((item) => item.comments.length > 0)
      .sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);

    const siteBodyElement = document.body;
    const siteFooterElement = siteBodyElement.querySelector('.footer');
    const filmsDetailsView = new FilmDetailsView();

    render(this.filmsComponent, this.filmsContainer);

    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsContainerComponent, this.filmsListComponent.getElement());
    for (let i=0; i < this.filmsList.length-1; i++) {
      render(new FilmView(this.filmsList[i]), this.filmsContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());

    if (this.filmsListRated.length > 0) {
      render(this.filmsListRatedComponent, this.filmsComponent.getElement());
      render(this.filmsRatedContainerComponent, this.filmsListRatedComponent.getElement());
      for (let i=0; i < 2; i++) {
        render(new FilmView(this.filmsListRated[i]), this.filmsRatedContainerComponent.getElement());
      }
    }

    if (this.filmsListCommented.length > 0) {
      render(this.filmsListCommentedComponent, this.filmsComponent.getElement());
      render(this.filmsCommentedContainerComponent, this.filmsListCommentedComponent.getElement());
      for (let i=0; i < 2; i++) {
        render(new FilmView(this.filmsListCommented[i]), this.filmsCommentedContainerComponent.getElement());
      }
    }

    render(filmsDetailsView, siteFooterElement, RenderPosition.AFTEREND);
    render(new FilmDetailsFormView(this.filmsList[0], this.filmsModel.getComments()), filmsDetailsView.getElement());
  };
}


