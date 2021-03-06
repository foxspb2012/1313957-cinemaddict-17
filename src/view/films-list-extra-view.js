import {createElement} from '../render.js';

const createFilmsListTemplate = (header) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${header}</h2>
  </section>`
);

export default class FilmsListExtraView {
  constructor(header) {
    this.header = header;
  }

  getTemplate() {
    return createFilmsListTemplate(this.header);
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
