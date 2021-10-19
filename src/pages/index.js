import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {validationConfig, popupTypeImage, popupProfile, popupPlace, editProfileForm, editProfileButton, profileName,
  profileJob, addPhotoForm, addPhotoButton, insertValues, avatar, editAvatarForm} from '../components/utils.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d',
    'Content-Type': 'application/json'
  }
});

/** Валидация */
const formProfile = new FormValidator(validationConfig, editProfileForm);
formProfile.enableValidation();
const formAddPhoto = new FormValidator(validationConfig, addPhotoForm);
formAddPhoto.enableValidation();
const formEditAvatar = new FormValidator(validationConfig, editAvatarForm);
formEditAvatar.enableValidation();

/**Включение обработчиков для pop-up с картинкой */
const popupImage = new PopupWithImage(popupTypeImage);
popupImage.setEventListeners();
/** попап удаления карточки*/
        const popupDelete = document.querySelector('#popup_type_check');
const popupDeleteImage = new PopupWithConfirmation(popupDelete);
popupDeleteImage.setEventListeners();


/** Создание экземляра класса Card */
const createCopyCard = (data) => {
   return new Card({data, handleOpenImage: () => {
    popupImage.open({name: data.name, link: data.link});
    }, handleRemoveCard: () => {
    popupDeleteImage.open();
}},'#card').generateCard();
};



/** Создание карточек */

const initialCards = api.getInitialCards()
  .then((data) => {
    const cardList = new Section({items:data, renderer: (item) =>{
     cardList.addItem(createCopyCard(item));
    }}, '.elements');
    cardList.renderItem();
    return cardList
  })
  .catch((err) => {
    console.log(err);
  });

  // const cardList = new Section({items: () => {
  //   return api.getInitialCards()
  //     .then((data) => {
  //       return data
  //     });
  // }, renderer: (item) =>{
  //   cardList.addItem(createCopyCard(item));
  // }}, '.elements');
  // cardList.renderItem();

  // const cardList = new Section({items:initialCards, renderer: (item) =>{
  //   createCopyCard(item);
  // }}, '.elements');
  // cardList.renderItem();

/** Форма добавления новой карточки */
const addFhotoForm = new PopupWithForm(popupPlace, {handleFormSubmit: (inputValues) =>{
  // createCopyCard(inputValues);
  api.setNewCard(inputValues)
  .then((data) => {
    createCopyCard(data);
  })
  .catch((err) => {
    console.log(err);
  })
}});

addFhotoForm.setEventListeners();
/**  Обработчик клика по кнопке добавления карточки */
addPhotoButton.addEventListener('click', () => {
  formAddPhoto.resetValidation();
  addFhotoForm.open();
});

/** Форма редактирования профиля */
const profile = new UserInfo({nameSelector:profileName, jobSelector:profileJob, avatarSelector: avatar});
const profileForm = new PopupWithForm(popupProfile, {handleFormSubmit: (inputValues)=>{
  api.setProfileInfo(inputValues)
  .then((data) => {
    profile.setUserInfo({name: data.name, job: data.about});
  })
  .catch((err) => {
    console.log(err);
  });
}});
 profileForm.setEventListeners();
/** Обработчик кнопки редактирования профиля */
editProfileButton.addEventListener('click', () => {
  formProfile.resetValidation();
  insertValues(profile.getUserInfo());
  profileForm.open();
});


api.getProfileInfo()
  .then((data) => {
    profile.setUserInfo({name: data.name, job: data.about, avatar: data.avatar});
  })
  .catch((err) => {
    console.log(err);
  })
          const popupAvatar = document.querySelector('#popup_type_avatar');
          const editAvatarButton = document.querySelector('.profile__overlay');
/** Форма редактирования аватара */
const avatarForm = new PopupWithForm(popupAvatar, {handleFormSubmit: () => {}});
avatarForm.setEventListeners();
/** Обработчик изменения аватара */
editAvatarButton.addEventListener('click', () => {
  avatarForm.open();
  formEditAvatar.resetValidation();
});


