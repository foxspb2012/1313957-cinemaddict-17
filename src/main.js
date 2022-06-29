import {render, RenderPosition} from './render.js';
import ProfileView from './view/profile-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import StatisticsView from './view/statistics-view.js';
import FilmDetailsView from './view/film-details-view.js';
import FilmDetailsInnerView from './view/film-details-form-view.js';
import FilmsPresenter from './presenter/films-presenter.js';

const siteBodyElement = document.body;
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteFooterElement = siteBodyElement.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter();
const filmsDetailsView = new FilmDetailsView();

render(new ProfileView, siteHeaderElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);
filmsPresenter.init(siteMainElement);
render(new StatisticsView(), siteFooterStatistics);
render(filmsDetailsView, siteFooterElement, RenderPosition.AFTEREND);
render(new FilmDetailsInnerView(), filmsDetailsView.getElement());
