const imageForm = document.querySelector('.img-upload__form');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const exitButton = imageForm.querySelector('.img-upload__cancel');
const descriptionField = imageForm.querySelector('.text__description');
const hashTagsField = imageForm.querySelector('.text__hashtags');
const scaleOutput = imageForm.querySelector('.scale__control--value');
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_SAMPLE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, true);

const validateHashTagsField = (value) => {
  const hashtags = value.toLowerCase()
    .split(' ')
    .filter((x) => x);

  const isUniqie = new Set(hashtags).size === hashtags.length;

  return hashtags.every((tag) => HASHTAG_SAMPLE.test(tag)) && hashtags.length <= MAX_HASHTAGS_COUNT && isUniqie;
};

pristine.addValidator(hashTagsField, validateHashTagsField, 'Непонятные хештеги');

const isOnFocus = (elementClass) => document.activeElement.classList.contains(`${elementClass}`);

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !(isOnFocus('text__description') || isOnFocus('text__hashtags'))){
    closeModal();
  }
};

const validateComments = (value) => {
  descriptionField.value = value.trimStart();
  return value.length <= 140;
};

pristine.addValidator(descriptionField, validateComments, 'Комментарий длиннее 140 символов');

const openModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  exitButton.addEventListener('click', closeModal);
};

function closeModal(){
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  descriptionField.value = '';
  hashTagsField.value = '';
  scaleOutput.value = '100%';
  document.removeEventListener('keydown', onDocumentKeydown);
  exitButton.removeEventListener('click', closeModal);
}

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModal();
});

exitButton.addEventListener('click', () => {
  closeModal();
});

imageForm.addEventListener('submit', (evt) => {
  const isValide = pristine.validate();
  if(!isValide){
    evt.preventDefault();
  }
});
