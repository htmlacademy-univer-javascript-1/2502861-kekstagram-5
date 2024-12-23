const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomObjectArray = (builder, max) => Array.from({length: getRandomNumber(0, max)}, builder);

function createIdGenerator (min, max) {
  let lastGeneratedId = min;

  return function () {
    lastGeneratedId += 1;
    if (lastGeneratedId > max) {
      lastGeneratedId = min;
    }

    return lastGeneratedId;
  };
}

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

export {getRandomNumber, getRandomObjectArray, createIdGenerator, getRandomArrayElement};
