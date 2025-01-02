import { alertError, showResultMessage } from './utils.js';

const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const execRequest = (route, onError, method = METHOD.GET, body = null, isUpload = false) =>
  fetch(
    `${BASE_URL}${route}`, { method, body }
  )
    .then((response) => {
      if (response.ok) {
        if (isUpload) {
          showResultMessage('success');
        }
        return response.json();
      }
    })
    .catch(onError);

const getPhotos = () => execRequest(ROUTE.GET_DATA, alertError);

const uploadPhoto = (body) => execRequest(ROUTE.SEND_DATA, showResultMessage('error'), METHOD.POST, body, true);

export { getPhotos, uploadPhoto };
