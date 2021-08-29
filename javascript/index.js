let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_el_name');
let jobInput = formElement.querySelector('.popup__input_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
const openImageForm = document.querySelector('.popup__image-container');
const addPhotoForm = document.querySelector('#addPhotoForm');
const editProfileForm = document.querySelector('#editProfileForm');
const addPhotoButton = document.querySelector('.profile__button');
const submitPhoto = document.querySelector('#add-photo-button');
let placeName = addPhotoForm.querySelector('.popup__input_el_place-name');
let placeLink = addPhotoForm.querySelector('.popup__input_el_link');

let initialCards = [
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


function getCards(index){
  const elements = document.querySelector('.elements');
  const cards = document.querySelector('#cards').content;
  const cardCopy = cards.querySelector('.element').cloneNode(true);
  cardCopy.querySelector('.element__item').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__item_active');
    // добавление лайка
  });
  cardCopy.querySelector('.element__delete-button').addEventListener('click', function(evt){
    let deletePhoto = evt.target.closest('.element');
    deletePhoto.remove();
    // удаление карточки
  });

  cardCopy.querySelector('.element__title').textContent = initialCards[index].name;
  cardCopy.querySelector('.element__image').src = initialCards[index].link;
  cardCopy.querySelector('.element__image').alt = initialCards[index].name;
  cardCopy.querySelector('.element__image').addEventListener('click', function(evt){
    popupOpenMode();
    popup.style.backgroundColor = 'rgba(0,0,0, .9)';
    document.querySelector('.popup__container').style.borderRadius = '0';
    document.querySelector('.popup__container').style.backgroundColor = 'transparent';
    openImageForm.classList.add('popup-image__container_opened');
    editProfileForm.classList.remove('popup__form_active');
    addPhotoForm.classList.remove('popup__form_active');
    document.querySelector('.popup__image').src = evt.target.src;
    document.querySelector('.popup__caption').textContent = evt.target.alt;
     // Открытие pop-up с картинкой
  });
    elements.prepend(cardCopy);
  }

initialCards.forEach( function (item, index){
  getCards(index);
});

function popupAddPhoto(){
  popupOpenMode();
  editProfileForm.classList.remove('popup__form_active');
  openImageForm.classList.remove('popup-image__container_opened');
  addPhotoForm.classList.add('popup__form_active');
  placeName.value = '';
  placeLink.value = '';
  // форма добавления фотографий
}

function formSubmitPhoto (evt) {
  evt.preventDefault();
  let newCard = {
    name: `${placeName.value}`,
    link: `${placeLink.value}`
  };
  initialCards.unshift(newCard);
  getCards([0]);
  popupCloseMode();
// форма сохранения карточки и добавления на страницу
}

function popupEditProfile (){
  popupOpenMode();
  addPhotoForm.classList.remove('popup__form_active');
  openImageForm.classList.remove('popup-image__container_opened');
  editProfileForm.classList.add('popup__form_active');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // добавление класса и перенос имени из профиля в форму
}

function popupOpenMode(){
  popup.classList.add('popup_opened');
  // Обнуление стилей формы
  popup.style.backgroundColor = "";
  document.querySelector('.popup__container').style.borderRadius = "";
  document.querySelector('.popup__container').style.backgroundColor = "";
}
function popupCloseMode(){
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupCloseMode();
  // Сохранение имени и описания, перенос на страницу
}

document.addEventListener('animationstart', function (e) {
  if (e.animationName === 'fade-in') {
    e.target.classList.add('popup_did-fade-in');
  }
});
document.addEventListener('animationend', function (e) {
  if (e.animationName === 'fade-out') {
    e.target.classList.remove('popup_did-fade-in');
   }
});

editButton.addEventListener('click', popupEditProfile);
closeButton.addEventListener('click', popupCloseMode);
addPhotoButton.addEventListener('click', popupAddPhoto);
addPhotoForm.addEventListener('submit', formSubmitPhoto);
editProfileForm.addEventListener('submit', formSubmitHandler);
