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
    showErrorModal(errorText);
  })
  .catch(() => showErrorModal(errorText));
const getPhotos = () => execRequest(ROUTE.GET_DATA, ERROR_TEXT.GET_DATA)
  .then((data) => drawPhotos(data))
  .catch(() => showErrorModal(ERROR_TEXT));
const uploadPhoto = (body) => execRequest(ROUTE.SEND_DATA, ERROR_TEXT.SEND_DATA, METHOD.POST, body);
export { getPhotos, uploadPhoto };
