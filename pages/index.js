let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup')

editButton.addEventListener('click', function(){
  popup.classList.remove('popup_not-active');
});

closeButton.addEventListener('click', function(){
  popup.classList.add('popup_not-active');
});

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__form_el_name');
let jobInput = document.querySelector('.popup__form_el_job');

function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__description');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.add('popup_not-active');
}
formElement.addEventListener('submit', formSubmitHandler);


