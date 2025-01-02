
const fullscreenContainer = document.querySelector('.big-picture');
const containerMeta = fullscreenContainer.querySelector('.big-picture__social');
const commentsList = containerMeta.querySelector('.social__comments');
const closeButton = fullscreenContainer.querySelector('.big-picture__cancel');
const commentsLoader = containerMeta.querySelector('.social__comments-loader');
const currentCommentsLoaded = containerMeta.querySelector('.current-count');
const COMMENTS_PER_LOAD = 5;
let wrapper;

const loadComment = (comment) => {
  commentsList.insertAdjacentHTML('beforeend', `<li class="social__comment"><img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"><p class="social__text">${comment.message}</p></li>`);
};

const handleLoaderVisibility = (totalCount) => {
  currentCommentsLoaded.textContent = commentsList.children.length;
  if (totalCount === commentsList.children.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const insertComments = (comments) => {
  commentsList.innerHTML = '';

  for (let i = 0; i < Math.min(comments.length, COMMENTS_PER_LOAD); ++i) {
    loadComment(comments[i]);
  }
  handleLoaderVisibility(comments.length, commentsList.children.length);

  const onLoaderClick = () => {
    const currentCount = commentsList.children.length;
    for (let i = currentCount; i < currentCount + Math.min(COMMENTS_PER_LOAD, comments.length - currentCount); ++i) {
      loadComment(comments[i]);
    }
    handleLoaderVisibility(comments.length, commentsList.children.length);
  };

  wrapper = onLoaderClick;

  commentsLoader.addEventListener('click', wrapper);
};

const drawBigPicture = (url, description, likes, comments) => {
  if (!url || !comments) {
    return;
  }
  fullscreenContainer.querySelector('.big-picture__img')
    .querySelector('img').src = url;
  containerMeta.querySelector('.social__header')
    .querySelector('.social__likes')
    .querySelector('.likes-count').textContent = likes;
  containerMeta.querySelector('.social__header')
    .querySelector('.social__caption').textContent = description;
  containerMeta.querySelector('.social__comment-count')
    .querySelector('.comments-count').textContent = comments.length;
  insertComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeFullview();
  }
};

function closeFullview() {
  fullscreenContainer.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  if (wrapper) {
    commentsLoader.removeEventListener('click', wrapper);
    wrapper = null;
  }

  commentsList.innerHTML = '';
}

closeButton.addEventListener('click', () => {
  closeFullview();
});

function openFullview(url, description, likes, comments) {
  fullscreenContainer.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  drawBigPicture(url, description, likes, comments);
}

export { openFullview };

import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('.social__comment');
const commentsContainer = document.querySelector('.social__comments');

// Создает комментарии
const renderComments = (comments) => {
  commentsContainer.innerHTML = '';

  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    const userAvatar = newComment.querySelector('.social__picture');
    const userMessage = newComment.querySelector('.social__text');

    userAvatar.src = comment.avatar;
    userAvatar.alt = comment.name;
    userMessage.textContent = comment.message;

    commentsContainer.appendChild(newComment);
  });
};

// Отрисовывет фото
const renderFullPhoto = (thumbnail) => {
  bigPicture.querySelector('.big-picture__img img').src = thumbnail.url;
  bigPicture.querySelector('.likes-count').textContent = thumbnail.likes;
  bigPicture.querySelector('.social__caption').textContent = thumbnail.description;
  bigPicture.querySelector('.big-picture__img img').alt = thumbnail.description;
  renderComments(thumbnail.coments);
};

// Закрывает по escape
const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Закрывает
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

// Закрывает по крестику
closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

// Открывает большое фото
const openBigPicture = (thumbnail) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  renderFullPhoto(thumbnail);
};

export { openBigPicture };