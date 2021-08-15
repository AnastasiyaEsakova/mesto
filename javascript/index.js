let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_el_name');
let jobInput = formElement.querySelector('.popup__input_el_job');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

function popupActiveMode(){
  popup.classList.toggle('popup_active');
  nameInput.textContent = nameInput.value;
  jobInput.textContent = jobInput.value;
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.remove('popup_active');
}

editButton.addEventListener('click', popupActiveMode);
closeButton.addEventListener('click', popupActiveMode);
formElement.addEventListener('submit', formSubmitHandler);


