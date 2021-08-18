let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_el_name');
let jobInput = formElement.querySelector('.popup__input_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');


function popupOpenMode(){
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // добавление класса и перенос имени из профиля в форму
}
function popupCloseMode(){
  popup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupCloseMode();
  // изменение данных профиля
}

editButton.addEventListener('click', popupOpenMode);
closeButton.addEventListener('click', popupCloseMode);
formElement.addEventListener('submit', formSubmitHandler);


