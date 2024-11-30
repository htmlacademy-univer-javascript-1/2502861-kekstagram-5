// Находим контейнер для вставки изображений
const picturesContainer = document.querySelector('.pictures');

// Находим шаблон
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция, заполняющая данными объект миниатюру
const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__img').alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments;

  return thumbnail;
};

// Функция, рисующая миниатюры на основе массива данных
const renderThumbnails = (thumbnailsAray) => {
  const picturesFragment = document.createDocumentFragment();
  thumbnailsAray.forEach((photo) => {
    const picture = createThumbnail(photo);
    picturesFragment.append(picture);
  });
  picturesContainer.appendChild(picturesFragment);

};

export { renderThumbnails };
