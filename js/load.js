import { alertError } from './utils.js';

const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const execRequest = (route, method = METHOD.GET, body = null) => fetch(
  `${BASE_URL}${route}`, { method, body }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).catch(() => alertError());

const getPhotos = () => execRequest(ROUTE.GET_DATA);

const uploadPhoto = (body) => execRequest(ROUTE.SEND_DATA, METHOD.POST, body);

export { getPhotos, uploadPhoto };
