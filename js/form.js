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
const sliderElement = document.querySelector('.effect-level__slider');

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

noUiSlider.create(sliderElement, {
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
    return `${sliderElement.noUiSlider.get()}px`;
  }

  return `${sliderElement.noUiSlider.get()}`;
};

const onFilterClick = (evt) => {
  if (evt.target.matches('input[type=radio]')) {
    if (evt.target.id !== 'effect-none') {
      sliderElement.parentElement.classList.remove('hidden');
      const filter = FILTERS[`${evt.target.id}`];
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: filter.min,
          max: filter.max
        },
        step: filter.step,
        start: filter.max,
      });
      sliderElement.noUiSlider.on('update', () => {
        imagePreview.style.filter = `${filter.name}(${operateSliderValue(filter)})`;
        effectLevel.value = operateSliderValue(filter) / filter.max * 100;
      });
    } else {
      sliderElement.parentElement.classList.add('hidden');
      imagePreview.style.filter = '';
      effectLevel.value = DEFAULT_VOLUME;
    }
  }
};

const addFilters = () => filterButtonList.addEventListener('click', onFilterClick);

const validateHashTagsField = (value) => {
  hashTagsField.value = value.trim();
  const hashtags = value.toLowerCase()
    .split(' ')
    .filter((x) => x);

  const isUniqie = new Set(hashtags).size === hashtags.length;

  return hashtags.every((tag) => HASHTAG_SAMPLE.test(tag)) && hashtags.length <= MAX_HASHTAGS_COUNT && isUniqie;
};

pristine.addValidator(hashTagsField, validateHashTagsField, 'Непонятные хештеги');

const isOnFocus = (elementClass) => document.activeElement.classList.contains(`${elementClass}`);

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !(isOnFocus('text__description') || isOnFocus('text__hashtags'))) {
    closeModal();
  }
};

const validateComments = (value) => {
  value = value.trim();
  descriptionField.value = value;
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
  addFilters();
};

function closeModal() {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  descriptionField.value = '';
  hashTagsField.value = '';
  scaleOutput.value = '100%';
  document.removeEventListener('keydown', onDocumentKeydown);
  exitButton.removeEventListener('click', closeModal);
  scaleAddButton.addEventListener('click', operateScale);
  scaleDecreaseButton.addEventListener('click', operateScale);
  filterButtonList.removeEventListener('click', onFilterClick);
}

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModal();
});

exitButton.addEventListener('click', () => {
  closeModal();
});

imageForm.addEventListener('submit', (evt) => {
  const isValide = pristine.validate();
  if (!isValide) {
    evt.preventDefault();
  }
});
