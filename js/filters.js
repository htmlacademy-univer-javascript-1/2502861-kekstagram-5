import { drawPhotos, deletePhotos } from './render-thumbnails.js';
import { debounce, takeRandomElements, createRandomGenerator } from './utils.js';
import { photos } from './main.js';

const RANDOM_PHOTOS_LENGTH = 10;
const FILTERS = {
  'filter-default': () => photos,
  'filter-random': () => takeRandomElements(photos, RANDOM_PHOTOS_LENGTH, createRandomGenerator(0, photos.length - 1)),
  'filter-discussed': () => [...photos].sort((a, b) => b.comments.length - a.comments.length)
};
const BUTTON_ACTIVITY_CLASS = 'img-filters__button--active';
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const isButton = (evt) => evt.target.tagName === 'BUTTON';
const onImgFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {
    deletePhotos();
    drawPhotos(FILTERS[evt.target.id]());
  }
});
const onButtonCLick = (evt) => {
  if (isButton(evt)) {
    const activeButton = imgFiltersForm.querySelector(`.${BUTTON_ACTIVITY_CLASS}`);
    if (activeButton) {
      activeButton.classList.remove(BUTTON_ACTIVITY_CLASS);
      activeButton.disabled = true;
    }
    evt.target.classList.add(BUTTON_ACTIVITY_CLASS);
    activeButton.disabled = false;
  }
};
const addFilters = () => {
  imgFiltersForm.addEventListener('click', onImgFiltersFormClick);
  imgFiltersForm.addEventListener('click', onButtonCLick);
};
export { addFilters };
