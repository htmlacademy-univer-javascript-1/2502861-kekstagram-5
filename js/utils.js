// Генератор уникальных айди (порядковые числа, начиная с)
const createIdGenerator = (start = 0) => () => {
  start += 1;
  return start;
};


// Ф-ция, кот. генерирует случайное положит число из диапазона

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Ф-ция, кот. генерирует случайный уникальный айди из диапазона

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  createIdGenerator,
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  isEscapeKey
};
