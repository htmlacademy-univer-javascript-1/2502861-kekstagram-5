import { getPhotos } from './load.js';
import { setFormSubmit } from './form.js';
import { addFilters } from './filters.js';
import { drawPhotos } from './render-thumbnails.js';

let photos = [];

getPhotos()
  .then((data) => {
    drawPhotos(data);
    photos = data.slice();
  })
  .then(() => document.querySelector('.img-filters').classList.remove('img-filters--inactive'));

addFilters();
setFormSubmit();

export { photos };
