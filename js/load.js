
import { alertError, showResultMessage } from './utils.js';


import { alertError } from './utils.js';


import { drawPhotos } from './render-thumbnails.js';

const errorModal = document.querySelector('.error-modal');


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


const execRequest = (route, method = METHOD.GET, body = null) => fetch(

const ERROR_TEXT = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
const showErrorModal = (text) => {
  errorModal.querySelector('.error-message').textContent = text;
  errorModal.classList.remove('hidden');
};
const execRequest = (route, errorText, method = METHOD.GET, body = null) => fetch(

  `${BASE_URL}${route}`, { method, body }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

  }).catch(() => alertError());

const getPhotos = () => execRequest(ROUTE.GET_DATA);

const uploadPhoto = (body) => execRequest(ROUTE.SEND_DATA, METHOD.POST, body);


    showErrorModal(errorText);
  })
  .catch(() => showErrorModal(errorText));
const getPhotos = () => execRequest(ROUTE.GET_DATA, ERROR_TEXT.GET_DATA)
  .then((data) => drawPhotos(data))
  .catch(() => showErrorModal(ERROR_TEXT));
const uploadPhoto = (body) => execRequest(ROUTE.SEND_DATA, ERROR_TEXT.SEND_DATA, METHOD.POST, body);


export { getPhotos, uploadPhoto };
