const NUMBER_PHOTO_DESCRIPTION_CREATED = 25;
const COMMENT_COUNT = 30;
const AVATAR_COUNT = 6;

const NAMES = [
  'Алена',
  'Иван',
  'Мария',
  'Виктор',
  'Юлия',
  'Альбина',
  'Валерий',
  'Георгий ',
  'Денис',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createIdGenerator() {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generatePhotoId = createIdGenerator();
const generateDescriptionPhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createComment() {
  return {
    id: generateCommentId(),
    avatar: 'img/avatar-' + getRandomInteger(1, AVATAR_COUNT) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}


function createPhotoDescription() {
  return {
    id: generateDescriptionPhotoId(),
    url: 'photos/' + generatePhotoId() + '.jpg',
    description: 'Моя первая фотография!',
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, createComment),
  };
}

const newPhotoDescriptions = Array.from({ length: NUMBER_PHOTO_DESCRIPTION_CREATED }, createPhotoDescription);
