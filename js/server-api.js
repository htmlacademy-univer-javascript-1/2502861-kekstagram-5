const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const execRequest = (route, onError, onSuccess, method = METHOD.GET, body = null) =>
  fetch(
    `${BASE_URL}${route}`, { method: method, body: body }
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(onError);

const getPhotos = (onSuccess, onError) => execRequest(ROUTE.GET_DATA, onError, onSuccess);

const uploadPhoto = (body, onSuccess, onError) => execRequest(ROUTE.SEND_DATA, onError, onSuccess, METHOD.POST, body, true);

export { getPhotos, uploadPhoto };
