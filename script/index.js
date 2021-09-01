const elementsContainer = document.querySelector('.elements');

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
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
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
    openPopup(popupImage);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
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

function formSubmitPhotoHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: `${inputPlaceName.value}`,
    link: `${inputPlaceLink.value}`
  };
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
function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
  // Сохранение имени и описания, перенос на страницу
}

function openPopup (popup){
  popup.classList.add('popup_opened');
}
function closePopup (popup){
  popup.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click', function(){closePopup(popupProfile)});
closeButtonPlace.addEventListener('click',  function(){closePopup(popupPlace)});
closeButtonImage.addEventListener('click', function(){closePopup(popupImage)});

editButton.addEventListener('click', openEditProfilePopup);
addPhotoButton.addEventListener('click', openAddCardPopup);
addPhotoForm.addEventListener('submit', formSubmitPhotoHandler);
editProfileForm.addEventListener('submit', formSubmitProfileHandler);
