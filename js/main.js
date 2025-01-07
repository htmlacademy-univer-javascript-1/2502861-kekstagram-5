import { getPhotos } from './server-api.js';
import { setFormSubmit } from './form.js';
import { addFilters } from './filters.js';
import { drawPhotos } from './render-thumbnails.js';
import { alertLoadError } from './utils.js';

let photos = [];

const onLoadSuccess = (data) => {
  photos = data.slice();
  drawPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

getPhotos(onLoadSuccess, alertLoadError);
addFilters();
setFormSubmit();

export { photos };
