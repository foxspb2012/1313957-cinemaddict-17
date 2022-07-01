import dayjs from 'dayjs';
import {getRandomInteger} from '../utils.js';
import {COMMENTS_INDEXES} from './mock-const.js';

const EMOTIONS = [
  'puke',
  'smile',
  'angry',
  'sleeping',
];

const AUTHORS = [
  'Tom Ford',
  'John Doe',
  'Little Pony',
  'Tim Macoveev',
  'Morgan Freeman'
];

const COMMENTS_TEXT = [
  'Laziness Who Sold Themselves.',
  'Header Authorization is not correct.',
  'With the best fight scenes since Bruce Lee.',
  'Oscar-winning film, a war drama about two young people.',
  'A film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
];

const getData = (array) => {
  const idx = getRandomInteger(1, array.length-1);
  return array[idx];
};

const generateDate = () => {
  const maxHoursGap = 12;
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(0, maxDaysGap);
  return dayjs().add(-daysGap, 'day').add(hoursGap, 'hour').toISOString();
};

const comments = [];

COMMENTS_INDEXES.map((comment) =>
  comments.push(
    {
      id: comment,
      author: getData(AUTHORS),
      comment: getData(COMMENTS_TEXT),
      date: generateDate(),
      emotion: getData(EMOTIONS),
    })
);

export {
  comments,
};

