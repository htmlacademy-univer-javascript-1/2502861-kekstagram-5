const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('#preview');
const effectPreviews = document.querySelectorAll('.effects__preview');

const setPreview = () => {
  const file = fileChooser.files[0];
  const fileUrl = URL.createObjectURL(file);
  preview.src = fileUrl;
  effectPreviews.forEach((el) => {
    el.style.backgroundImage = `url(${fileUrl})`;
  });
};

export { setPreview };
