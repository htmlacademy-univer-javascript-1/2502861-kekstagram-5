import { isEscapeKey } from './utils.js';

const COMMENTS_PER_LOAD = 5;
const fullscreenModal = document.querySelector('.big-picture');
const pictureMetadata = fullscreenModal.querySelector('.big-picture__social');
const commentsList = pictureMetadata.querySelector('.social__comments');
const closeButton = fullscreenModal.querySelector('.big-picture__cancel');
const commentsLoader = pictureMetadata.querySelector('.social__comments-loader');
const currentCommentsLoaded = pictureMetadata.querySelector('.social__comment-shown-count');
const bigPicture = fullscreenModal.querySelector('.big-picture__img');
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

  bigPicture.querySelector('img').src = url;
  pictureMetadata.querySelector('.likes-count').textContent = likes;
  pictureMetadata.querySelector('.social__caption').textContent = description;
  pictureMetadata.querySelector('.social__comment-total-count').textContent = comments.length;
  insertComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeFullview();
  }
};

function closeFullview() {
  fullscreenModal.classList.add('hidden');
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
  fullscreenModal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  drawBigPicture(url, description, likes, comments);
}

export { openFullview };
