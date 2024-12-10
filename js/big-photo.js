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
