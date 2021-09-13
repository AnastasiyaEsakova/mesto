const elementsContainer = document.querySelector('.elements');
const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfile = document.querySelector('#popup_type_profile');
const editProfileForm = document.querySelector('#edit_profile_form');

const popupPlace = document.querySelector('#popup_type_place');
const popupImage = document.querySelector('#popup_type_image');
const nameInput = editProfileForm.querySelector('.popup__input_el_name');
const jobInput = editProfileForm.querySelector('.popup__input_el_job');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const addPhotoForm = document.querySelector('#add_photo_form');
const inputPlaceName = addPhotoForm.querySelector('.popup__input_el_place-name');
const inputPlaceLink = addPhotoForm.querySelector('.popup__input_el_link');
const addPhotoButton = document.querySelector('.profile__button');
const submitPhoto = document.querySelector('#add-photo-button');

const closeButtonProfile = document.querySelector('#button_close_profile');
const closeButtonPlace = document.querySelector('#button_close_place');
const closeButtonImage = document.querySelector('#button_close_image');
const popupImageImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const card = document.querySelector('#card').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function getCard (item) {
  const cardCopy = card.querySelector('.element').cloneNode(true);
  const cardImage = cardCopy.querySelector('.element__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardCopy.querySelector('.element__title').textContent = item.name;
  cardCopy.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
    // добавление лайка
  });
  cardCopy.querySelector('.element__delete-button').addEventListener('click', (evt) =>{
    const deletePhoto = evt.target.closest('.element');
    deletePhoto.remove();
    // удаление карточки
  });
  cardImage.addEventListener('click', function(evt){
    openPopup(popupImage);
    popupImageImage.src = evt.target.src;
    popupImageImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
     // pop-up с картинкой
  });
  return cardCopy;
 }

function renderCard(item){
  elementsContainer.prepend(getCard(item));
}

initialCards.forEach( function (card){
  renderCard(card);
});

function openAddCardPopup(){
  openPopup(popupPlace);
  addPhotoForm.reset();
  // форма добавления фотографий
}

function cardFormSubmitHandler() {
  const newCard = {
    name: `${inputPlaceName.value}`,
    link: `${inputPlaceLink.value}`
  };
  renderCard(newCard);
  closePopup(popupPlace);
// форма сохранения карточки и добавления на страницу
}
// const checkFormValidity = (form, elementInputFirst, elementInputSecond ) => {
//   checkInputValidity(form, elementInputFirst, validationConfig.inputErrorClass, validationConfig.errorClass);
//   checkInputValidity(form, elementInputSecond, validationConfig.inputErrorClass, validationConfig.errorClass);
//   if(elementInputFirst.validity.valid && elementInputSecond.validity.valid){
//     form.querySelector('.popup__button').classList.remove(validationConfig.inactiveButtonClass);
//   }
//   // проверка формы перед открытием
// };

function openEditProfilePopup (){
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  //checkFormValidity(editProfileForm, nameInput, jobInput);
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
    const popup = popupList.find((popupElement) => {
      return popupElement.classList.contains('popup_opened');
    })
    closePopup(popup);
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
  popup.addEventListener('click', function(evt){
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')){
      const popupElement = evt.target.closest('.popup');
      closePopup(popupElement);
    }
      // закрывает pop-up кликом по фону и крестику
  });
});

// editButton.addEventListener('click', () => {
//   openEditProfilePopup();
// } );
// addPhotoButton.addEventListener('click', () => {
//   openAddCardPopup();
// });
addPhotoForm.addEventListener('submit', cardFormSubmitHandler);
editProfileForm.addEventListener('submit', profileFormSubmitHandler);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);
