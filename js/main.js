import { NUMBER_PHOTO_DESCRIPTION_CREATED } from './data.js';
import { createPhotoDescription } from './util.js';

const newPhotoDescriptions = Array.from({ length: NUMBER_PHOTO_DESCRIPTION_CREATED }, createPhotoDescription);
