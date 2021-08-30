const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('#popupProfile');
const popupPlace = document.querySelector('#popupPlace');
const popupImage = document.querySelector('#popupImage');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_el_name');
const jobInput = formElement.querySelector('.popup__input_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const openImagePopup = document.querySelector('.popup__image-container');
const addPhotoForm = document.querySelector('#addPhotoForm');
const editProfileForm = document.querySelector('#editProfileForm');
const addPhotoButton = document.querySelector('.profile__button');
const submitPhoto = document.querySelector('#add-photo-button');
const inputPlaceName = addPhotoForm.querySelector('.popup__input_el_place-name');
const inputPlaceLink = addPhotoForm.querySelector('.popup__input_el_link');
const elementsContainer = document.querySelector('.elements');

const closeButtonProfile = document.querySelector('#closePopupProfile');
const closeButtonPlace = document.querySelector('#closePopupPlace');
const closeButtonImage = document.querySelector('#closePopupImage');

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
  let card
  let cardCopy
function getCard (item) {
  card = document.querySelector('#card').content;
  cardCopy = card.querySelector('.element').cloneNode(true);

  const cardImage = cardCopy.querySelector('.element__image');
  cardCopy.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardCopy.querySelector('.element__like').addEventListener('click', function(evt){
      evt.target.classList.toggle('element__like_active');
      // добавление лайка
    });
  cardCopy.querySelector('.element__delete-button').addEventListener('click', function(evt){
    const deletePhoto = evt.target.closest('.element');
    deletePhoto.remove();
    // удаление карточки
  });
  cardImage.addEventListener('click', function(evt){
    popupOpenMode(popupImage);
    document.querySelector('.popup__image').src = evt.target.src;
    document.querySelector('.popup__image').alt = evt.target.alt;
    document.querySelector('.popup__caption').textContent = evt.target.alt;
     // Открытие pop-up с картинкой
  });
    return cardCopy;
 }

initialCards.forEach( function (item){
    getCard(item);
    renderCard(cardCopy);
  });

function renderCard(card){
  elementsContainer.prepend(card);
}

function popupAddPhoto(){
  popupOpenMode(popupPlace);
  inputPlaceName.value = "";
  inputPlaceLink.value = "";
  // форма добавления фотографий
}

function formSubmitPhoto (evt) {
  evt.preventDefault();
  const newCard = {
    name: `${inputPlaceName.value}`,
    link: `${inputPlaceLink.value}`
  };
  getCard(newCard);
  renderCard(cardCopy);
  popupCloseMode();
// форма сохранения карточки и добавления на страницу
}

function popupEditProfile (){
  popupOpenMode(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // добавление класса и перенос имени из профиля в форму
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupCloseMode();
  // Сохранение имени и описания, перенос на страницу
}

function popupOpenMode(item){
  item.classList.add('popup_opened');
}
function popupCloseMode(){
  popupProfile.classList.remove('popup_opened');
  popupPlace.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click', popupCloseMode);
closeButtonPlace.addEventListener('click', popupCloseMode);
closeButtonImage.addEventListener('click', popupCloseMode);

editButton.addEventListener('click', popupEditProfile);
addPhotoButton.addEventListener('click', popupAddPhoto);
addPhotoForm.addEventListener('submit', formSubmitPhoto);
editProfileForm.addEventListener('submit', formSubmitHandler);
