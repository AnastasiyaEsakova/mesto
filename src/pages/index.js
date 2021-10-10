import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, validationConfig, popupTypeImage, popupProfile, popupPlace, editProfileForm, editButton, profileName,
  profileJob, addPhotoForm, addPhotoButton, insertValues} from '../components/utils.js'

/** Валидация */
const formProfile = new FormValidator(validationConfig, editProfileForm);
formProfile.enableValidation();
const formAddPhoto = new FormValidator(validationConfig, addPhotoForm);
formAddPhoto.enableValidation();

/**Включение обработчиков для pop-up с картинкой */
const popupImage = new PopupWithImage(popupTypeImage);
popupImage.setEventListeners();

/** Создание экземляра класса Card */
const createCopyCard = (data) => {
   const element = new Card({place:data.place, link:data.link, handleOpenImage: () => {
    popupImage.open({place: data.place, link: data.link});
  }},'#card').generateCard();
  cardList.addItem(element);
};

/** Создание карточек */
const cardList = new Section({items:initialCards, renderer: (item) =>{
  createCopyCard(item);
}}, '.elements');

/** Форма добавления новой карточки */
const addFhotoForm = new PopupWithForm(popupPlace, {handleFormSubmit: (inputValues) =>{
  createCopyCard(inputValues);
}});
addFhotoForm.setEventListeners();
/**  Обработчик клика по кнопке добавления карточки */
addPhotoButton.addEventListener('click', () => {
  formAddPhoto.resetValidation();
  addFhotoForm.open();
});

/** Форма редактирования профиля */
const profile = new UserInfo({nameSelector:profileName, jobSelector:profileJob});
const profileForm = new PopupWithForm(popupProfile, {handleFormSubmit: (inputValues)=>{
  profile.setUserInfo(inputValues);
}});
 profileForm.setEventListeners();
/** Обработчик кнопки редактирования профиля */
editButton.addEventListener('click', () => {
  formProfile.resetValidation();
  insertValues(profile.getUserInfo());
  profileForm.open();
});

cardList.renderItem();




