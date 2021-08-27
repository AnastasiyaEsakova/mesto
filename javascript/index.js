let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_el_name');
let jobInput = formElement.querySelector('.popup__input_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');




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

  function getCards(indexNumber){
    const elements = document.querySelector('.elements');
    const cards = document.querySelector('#cards').content;
    const cardCopy = cards.querySelector('.element').cloneNode(true);
    cardCopy.querySelector('.element__item').addEventListener('click', function(evt){
          evt.target.classList.toggle('element__item_active');
        });
     const deleteButton = cardCopy.querySelector('.element__delete-button');
     deleteButton.addEventListener('click', function(evt){
        let deletePhoto = evt.target.closest('.element');
        deletePhoto.remove();
     });
    cardCopy.querySelector('.element__title').textContent = initialCards[indexNumber].name;
    cardCopy.querySelector('.element__image').src = initialCards[indexNumber].link;
    cardCopy.querySelector('.element__image').alt = initialCards[indexNumber].name;

    elements.prepend(cardCopy);
  }

    initialCards.forEach( function (item, index){
    getCards(index);
  });



const addPhotoForm = document.querySelector('#addPhotoForm');
const editProfileForm = document.querySelector('#editProfileForm');
const addPhotoButton = document.querySelector('.profile__button');
function popupAddPhoto(){
  popupOpenMode();
  editProfileForm.classList.remove('popup__form_active');
  addPhotoForm.classList.add('popup__form_active');
  placeName.value = '';
  placeLink.value = '';
  // форма добавления фотографий
}

const submitPhoto = document.querySelector('#add-photo-button');
let placeName = addPhotoForm.querySelector('.popup__input_el_place-name');
let placeLink = addPhotoForm.querySelector('.popup__input_el_link');

function formSubmitPhoto (evt) {
  evt.preventDefault();
  let b = {
    name: `${placeName.value}`,
    link: `${placeLink.value}`
  };
  initialCards.unshift(b);
  getCards([0]);
  popupCloseMode();
// форма добавления карточки на страницу
}

function popupEditProfile (){
  popupOpenMode();
  addPhotoForm.classList.remove('popup__form_active');
  editProfileForm.classList.add('popup__form_active');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // добавление класса и перенос имени из профиля в форму
}
function popupOpenMode(){
  popup.classList.add('popup_opened');
}
function popupCloseMode(){
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupCloseMode();
}




editButton.addEventListener('click', popupEditProfile);
closeButton.addEventListener('click', popupCloseMode);
formElement.addEventListener('submit', formSubmitHandler);
addPhotoButton.addEventListener('click', popupAddPhoto);
submitPhoto.addEventListener('click', formSubmitPhoto);
