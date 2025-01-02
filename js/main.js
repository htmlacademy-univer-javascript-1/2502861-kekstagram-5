import { getPhotos } from './load.js';
import { setFormSubmit } from './form.js';
import { alertError } from './utils.js';
import { addFilters } from './filters.js';
import { drawPhotos } from './render-thumbnails.js';

let photos = [];

getPhotos()
  .then((data) => {
    drawPhotos(data);
    photos = data.slice();
  })
  .then(() => document.querySelector('.img-filters').classList.remove('img-filters--inactive'))
  .catch(() => alertError());

addFilters();
setFormSubmit();

export { photos };
