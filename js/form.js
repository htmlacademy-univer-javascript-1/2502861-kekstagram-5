import { uploadPhoto } from './load.js';
import { setPreview } from './image.js';

const imageForm = document.querySelector('.img-upload__form');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const exitButton = imageForm.querySelector('.img-upload__cancel');
const descriptionField = imageForm.querySelector('.text__description');
const hashTagsField = imageForm.querySelector('.text__hashtags');
const scaleOutput = imageForm.querySelector('.scale__control--value');
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_SAMPLE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, true);
const imagePreview = imageForm.querySelector('#preview');
const scaleAddButton = imageForm.querySelector('.scale__control--bigger');
const scaleDecreaseButton = imageForm.querySelector('.scale__control--smaller');
const effectLevel = imageForm.querySelector('.effect-level__value');
const DEFAULT_VOLUME = 100;
const filterButtonList = document.querySelector('.effects__list');
const SCALE_DIFFERENCE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const slider = document.querySelector('.effect-level__slider');
const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

class Filter {
  constructor(name, min, max, step) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.step = step;
  }
}

const FILTERS = {
  'effect-chrome': new Filter('grayscale', 0, 1, 0.1),
  'effect-sepia': new Filter('sepia', 0, 1, 0.1),
  'effect-marvin': new Filter('invert', 0, 1, 0.01),
  'effect-phobos': new Filter('blur', 0, 3, 0.1),
  'effect-heat': new Filter('brightness', 1, 3, 0.1)
};

const operateScale = (evt) => {
  let scale = parseInt(scaleOutput.value, 10);
  if (evt.target.classList.contains('scale__control--bigger') && scale + SCALE_DIFFERENCE <= MAX_SCALE) {
    scale += SCALE_DIFFERENCE;
  } else if (evt.target.classList.contains('scale__control--smaller') && scale - SCALE_DIFFERENCE >= MIN_SCALE) {
    scale -= SCALE_DIFFERENCE;
  }

  scaleOutput.value = `${scale}%`;
  imagePreview.style.transform = `scale(${scale / 100})`;
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100
  },
  step: 1,
  start: 100,
  connect: 'lower'
});

const operateSliderValue = (filter) => {
  if (filter.name === 'blur') {
    return `${slider.noUiSlider.get()}px`;
  }

  return `${slider.noUiSlider.get()}`;
};

const setDefaultFilter = () => {
  slider.parentElement.classList.add('hidden');
  imagePreview.style.filter = '';
  effectLevel.value = DEFAULT_VOLUME;
  document.querySelector('#effect-none').checked = true;
};

const onFilterClick = (evt) => {
  if (evt.target.matches('input[type=radio]')) {
    if (evt.target.id !== 'effect-none') {
      slider.parentElement.classList.remove('hidden');
      const filter = FILTERS[`${evt.target.id}`];
      slider.noUiSlider.updateOptions({
        range: {
          min: filter.min,
          max: filter.max
        },
        step: filter.step,
        start: filter.max,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `${filter.name}(${operateSliderValue(filter)})`;
        effectLevel.value = operateSliderValue(filter) / filter.max * 100;
      });
    } else {
      setDefaultFilter();
    }
  }
};

const addFilters = () => filterButtonList.addEventListener('click', onFilterClick);

const validateHashTagsField = (value) => {
  const hashtags = value.toLowerCase()
    .split(' ')
    .filter((x) => x);
  return hashtags.every((tag) => HASHTAG_SAMPLE.test(tag));
};

const isUniqie = (value) => {
  const hashtags = value.toLowerCase()
    .split(' ')
    .filter((x) => x);
  return new Set(hashtags).size === hashtags.length;
};

const isCountValid = (value) => {
  const hashtags = value.toLowerCase()
    .split(' ')
    .filter((x) => x);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

pristine.addValidator(hashTagsField, isCountValid, 'Слишком много хэш-тегов');
pristine.addValidator(hashTagsField, isUniqie, 'Повтор хэш-тега');
pristine.addValidator(hashTagsField, validateHashTagsField, 'Невалидный хэш-тег');

const isOnFocus = (elementClass) => document.activeElement.classList.contains(`${elementClass}`);

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !(isOnFocus('text__description') || isOnFocus('text__hashtags'))) {
    closeModal();
  }
};

const validateComments = (value) => {
  value = value.trim();
  return value.length <= 140;
};

pristine.addValidator(descriptionField, validateComments, 'Комментарий длиннее 140 символов');

const openModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  exitButton.addEventListener('click', closeModal);
  scaleAddButton.addEventListener('click', operateScale);
  scaleDecreaseButton.addEventListener('click', operateScale);
  setPreview();
  addFilters();
};

function closeModal() {
  uploadInput.value = '';
  descriptionField.value = '';
  hashTagsField.value = '';
  scaleOutput.value = '100%';
  setDefaultFilter();
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  exitButton.removeEventListener('click', closeModal);
  scaleAddButton.removeEventListener('click', operateScale);
  scaleDecreaseButton.removeEventListener('click', operateScale);
  filterButtonList.removeEventListener('click', onFilterClick);
}

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModal();
});

exitButton.addEventListener('click', () => {
  closeModal();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = () => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      uploadPhoto(new FormData(evt.target))
        .then(() => closeModal())
        .finally(() => unblockSubmitButton());
    }
  });
};

export { setFormSubmit };
