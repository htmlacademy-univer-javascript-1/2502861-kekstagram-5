class Filter {
  constructor(name, min, max, step) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.step = step;
  }
}

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const takeRandomElements = (array, length, randomizer) => Array.from({ length: length }, () => array[randomizer()]);

const toggleButtons = (buttons, activeId) => {
  const currentActive = document.querySelector(`#${activeId}`);
  for (let i = 0; i < buttons.length; ++i) {
    if (buttons[i].classList.contains('img-filters__button--active')) {
      buttons[i].classList.remove('img-filters__button--active');
      buttons[i].disabled = false;
    }

    currentActive.classList.add('img-filters__button--active');
    currentActive.disabled = true;
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onModalKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    deleteResultMessage();
  }
};

const onModalButtonClick = () => {
  deleteResultMessage();
};

const awayModalClick = (evt) => {
  if (evt.target === document.body.lastElementChild) {
    deleteResultMessage();
  }
};

const isOnFocus = (elementClass) => document.activeElement.classList.contains(`${elementClass}`);

function deleteResultMessage() {
  const addedMessage = document.body.lastElementChild;
  addedMessage.querySelector('button').removeEventListener('click', onModalButtonClick);
  document.removeEventListener('keydown', onModalKeydown);
  document.removeEventListener('click', awayModalClick);
  addedMessage.remove();

}

const showModal = (templateId) => {
  const messageTemplate = document.querySelector(`#${templateId}`).content;
  const message = messageTemplate.cloneNode(true);
  const messageFragment = document.createDocumentFragment();
  messageFragment.appendChild(message);
  document.body.appendChild(messageFragment);
};

const showResultMessage = (templateId) => {
  showModal(templateId);
  const btn = document.querySelector(`.${templateId}__button`);
  document.addEventListener('keydown', onModalKeydown);
  document.addEventListener('click', awayModalClick);
  btn.addEventListener('click', onModalButtonClick);
};

const showUploadSucccessMessage = () => showResultMessage('success');
const showUploadErrorMessage = () => showResultMessage('error');
const alertLoadError = () => showModal('data-error');

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  showUploadSucccessMessage,
  showUploadErrorMessage,
  alertLoadError,
  takeRandomElements,
  toggleButtons,
  debounce,
  createRandomGenerator,
  isEscapeKey,
  isOnFocus,
  Filter
};
