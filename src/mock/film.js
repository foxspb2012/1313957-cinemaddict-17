import dayjs from 'dayjs';
import {getRandomInteger, getRandomPositiveFloat, shuffle} from '../utils.js';
import {COMMENTS_INDEXES, TITLES, FILM_INFO, AGE_RATINGS, COUNTRIES, GENRES, DESCRIPTIONS} from './mock-const.js';

const generateComments = () => {
  const count = getRandomInteger(0, 9);
  let comments = [];
  if (count > 0) {
    comments = shuffle([...COMMENTS_INDEXES]).slice(0, count);
  }
  return comments;
};

const getData = (array) => {
  const count = getRandomInteger(1, array.length-1);
  return shuffle([...array]).slice(0, count);
};

const getReleaseDate = () => dayjs().add(-getRandomInteger(5, 60), 'year').add(getRandomInteger(20, 180), 'day');

const getWatchingDate = () => dayjs().add(-getRandomInteger(1, 60), 'day');

const getBoolean = () => Boolean(getRandomInteger(0, 1));

export const generateFilm = () => {
  const id = getRandomInteger(0, TITLES.length-1);
  const title = TITLES[id];

  let info = {};
  Object.entries(FILM_INFO).filter(([key, value]) => {if(key === title){info = value;}});

  const watchlist = getBoolean();
  const alreadyWatched = getBoolean();
  const watchingDate = alreadyWatched === true ? getWatchingDate() : null;
  const favorite = getBoolean();

  return {
    id,
    comments: generateComments(),
    filmInfo: {
      title,
      alternativeTitle: info.alternativeTitle,
      totalRating: getRandomPositiveFloat(5,9,1),
      poster: info.poster,
      ageRating: AGE_RATINGS[getRandomInteger(0, AGE_RATINGS.length-1)],
      director: info.director,
      writers: info.writers,
      actors: info.actors,
      release: {
        date:  getReleaseDate(),
        releaseCountry: COUNTRIES[getRandomInteger(0, COUNTRIES.length-1)],
      },
      runtime: getRandomInteger(30, 150),
      genre: getData(GENRES),
      description: getData(DESCRIPTIONS).join(''),
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      watchingDate,
      favorite,
    },
  };
};

