import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, validationConfig} from './utils.js'
const elementsContainer = document.querySelector('.elements');
const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfile = document.querySelector('#popup_type_profile');
const editProfileForm = document.querySelector('#edit_profile_form');

const popupPlace = document.querySelector('#popup_type_place');
const nameInput = editProfileForm.querySelector('.popup__input_el_name');
const jobInput = editProfileForm.querySelector('.popup__input_el_job');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const addPhotoForm = document.querySelector('#add_photo_form');
const inputPlaceName = addPhotoForm.querySelector('.popup__input_el_place-name');
const inputPlaceLink = addPhotoForm.querySelector('.popup__input_el_link');
const addPhotoButton = document.querySelector('.profile__button');

const popupImageImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('#popup_type_image');

const formProfile = new FormValidator(validationConfig, editProfileForm);
const formProfileValid = formProfile.enableValidation();
const formAddPhoto = new FormValidator(validationConfig, addPhotoForm);
const formAddPhotoValid = formAddPhoto.enableValidation();


function handleOpenPopupImage(){
  openPopup(popupImage);
  popupImageImage.src = this._link;
  popupImageImage.alt = this._name;
  popupImageCaption.textContent = this._name;
}
function renderCard(card){
  elementsContainer.prepend(card);
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, handleOpenPopupImage);
  const cardElement = card.generateCard();
  renderCard(cardElement);
});

function openAddCardPopup(){
  openPopup(popupPlace);
  addPhotoForm.reset();
  // форма добавления фотографий
}

function cardFormSubmitHandler() {
  const newCard = new Card(inputPlaceName.value, inputPlaceLink.value).generateCard();
  renderCard(newCard);
  closePopup(popupPlace);
// форма сохранения карточки и добавления на страницу
}

function openEditProfilePopup (){
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // добавление класса и перенос имени из профиля в форму
}
function profileFormSubmitHandler() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
  // Сохранение имени и описания, перенос на страницу
}

const closeWithEsc = (evt) => {
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
      // закрывает pop-up клавишей ESC
}};

function openPopup (popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}
function closePopup (popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', function(evt){
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')){
      const popupElement = evt.target.closest('.popup');
      closePopup(popupElement);
    }
      // закрывает pop-up кликом по фону и крестику
  });
});

editButton.addEventListener('click', () => {
  openEditProfilePopup();
  formProfile.resetValidation();
});
addPhotoButton.addEventListener('click', () => {
  openAddCardPopup();
  formAddPhoto.resetValidation();
});
addPhotoForm.addEventListener('submit', cardFormSubmitHandler);
editProfileForm.addEventListener('submit', profileFormSubmitHandler);


