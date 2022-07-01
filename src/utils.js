import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomPositiveFloat = function (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return Number(result.toFixed(digits));
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

const getDuration = (runtime) => {
  const hour = Math.trunc(runtime/60);
  const minute = runtime - hour * 60;
  return (`${hour}h ${minute}m`);
};

const formatDate = (date, format) => dayjs(date).format(format);

const humanizeDate = (date) => dayjs(date).fromNow();

export {
  getRandomInteger,
  getRandomPositiveFloat,
  shuffle,
  getDuration,
  formatDate,
  humanizeDate,
};
