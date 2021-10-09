import './pages/index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js'
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import {initialCards, validationConfig, popupTypeImage, popupProfile, popupPlace, editProfileForm, editButton, profileName,
  profileJob, addPhotoForm, addPhotoButton} from './components/utils.js'

// Валидация
const formProfile = new FormValidator(validationConfig, editProfileForm);
formProfile.enableValidation();
const formAddPhoto = new FormValidator(validationConfig, addPhotoForm);
formAddPhoto.enableValidation();

// Включение обработчиков для pop-up с картинкой
const popupImage = new PopupWithImage(popupTypeImage);
popupImage.setEventListeners();

// Создание карточек
const cardList = new Section({items:initialCards, renderer: (item) =>{
  const card = new Card({link:item.link, name:item.name, handleOpenImage: () => {
    popupImage.open({name:item.name,link:item.link});
  }},'#card');
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}}, '.elements');


// Форма добавление новой карточки
const addFhotoForm = new PopupWithForm(popupPlace, {handleFormSubmit: (inputValues) =>{
  const newCard = new Card({link:inputValues.link, name:inputValues.place,
    handleOpenImage: () => {popupImage.open({name: inputValues.place,link:inputValues.link})}
  },'#card');
  const newCardElement = newCard.generateCard();
  cardList.addItem(newCardElement);
}});
addFhotoForm.setEventListeners();
// Обработчик клика по кнопке добавления карточки
addPhotoButton.addEventListener('click', () => {
  formAddPhoto.resetValidation();
  addFhotoForm.open();
});

// Форма редактирования профиля
const profile = new UserInfo({nameSelector:profileName, jobSelector:profileJob});
const profileForm = new PopupWithForm(popupProfile, {handleFormSubmit: (inputValues)=>{
  profile.setUserInfo(inputValues);
}});
 profileForm.setEventListeners();
// Обработчик кнопки редактирования профиля
editButton.addEventListener('click', () => {
  formProfile.resetValidation();
  profile.getUserInfo();
  profileForm.open();
});

cardList.renderItem();




