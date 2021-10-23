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
  profileJob, addPhotoForm, addPhotoButton, insertValues, avatar, editAvatarForm, popupDelete, popupAvatar, editAvatarButton,
  popupError, errorText} from '../components/utils.js';

  /**API */
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

/**PROFILE */
/** Форма редактирования профиля */
const profileButton = document.querySelector('#edit-profile-button');
const profile = new UserInfo({nameSelector:profileName, jobSelector:profileJob, avatarSelector: avatar});
const profileForm = new PopupWithForm(popupProfile, {handleFormSubmit: (inputValues)=>{
  api.setProfileInfo(inputValues, profileButton)
  .then((data) => {
    profile.setUserInfo({name: data.name, about: data.about, avatar: data.avatar});
  })
  .catch((err) => {
    errorText.textContent = err;
    popupError.classList.add('popup_opened');
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
    profile.setUserInfo(data);
    popupError.classList.remove('popup_opened');
  })
  .catch((err) => {
    errorText.textContent = err;
    popupError.classList.add('popup_opened');
  });

/**CARDS */
/** Создание экземляра класса Card */
const createCopyCard = (data) => {
   const card =  new Card({data,
    handleOpenImage: () => {
      popupImage.open({name: data.name, link: data.link});
    },
    handleRemoveCard: (id, element) => {
      popupDeleteImage.open();
      popupDeleteImage.getCard(id, element);
    },
    handleLike:{
      handleSetLike: (id, element) => {
        api.setLike(id)
        .then((res) => {
          element.querySelector('.element__like-numbers').textContent = res.likes.length;
          popupError.classList.remove('popup_opened');
      })
        .catch(err => {
        errorText.textContent = err;
        popupError.classList.add('popup_opened');
      })
    },
      handleDeleteLike: (id, element) => {
        api.deleteLIke(id)
        .then((res) => {
          if(res.likes.length !== 0){
            element.querySelector('.element__like-numbers').textContent = res.likes.length;
          } else{
            element.querySelector('.element__like-numbers').textContent = '';
        };
          popupError.classList.remove('popup_opened');
      })
        .catch(err => {
        errorText.textContent = err;
        popupError.classList.add('popup_opened');
      });
  }
   }},'#card').generateCard();
   return card
};

/** Создание карточек */
const getCards =() =>{
  api.getInitialCards()
  .then((data) => {
    const cardList = new Section({items:data, renderer: (item) =>{
      cardList.addItem(createCopyCard(item));
    }}, '.elements');
    cardList.renderItem();
    popupError.classList.remove('popup_opened');
  })
  .catch((err) => {
    errorText.textContent = err;
    popupError.classList.add('popup_opened');
  });
}
getCards();

/** Форма добавления новой карточки */
const cardButton = document.querySelector('#add-photo-button');
const addFhotoForm = new PopupWithForm(popupPlace, {handleFormSubmit: (inputValues) =>{
  api.setNewCard(inputValues, cardButton)
  .then((data) => {
    const cardSection = new Section({},'.elements');
    cardSection.addNewItem(createCopyCard(data));
    popupError.classList.remove('popup_opened');
  })
  .catch((err) => {
    errorText.textContent = err;
    popupError.classList.add('popup_opened');
  })
}});
addFhotoForm.setEventListeners();
/**  Обработчик клика по кнопке добавления карточки */
addPhotoButton.addEventListener('click', () => {
  formAddPhoto.resetValidation();
  addFhotoForm.open();
});

/** Попап удаления карточки*/
const popupDeleteImage = new PopupWithConfirmation(popupDelete, {
  handleSubmitDelete: (id, element) => {
    api.deleteCard(id)
    .then(() => {
      element.remove();
      element = '';
      popupError.classList.remove('popup_opened');
    })
    .catch(err => {
      errorText.textContent = err;
      popupError.classList.add('popup_opened');
    });
  }
});
popupDeleteImage.setEventListeners();

//**AVATAR */
/** Форма редактирования аватара */
const avatarButton = document.querySelector('#edit-avatar-button');
const avatarForm = new PopupWithForm(popupAvatar, {handleFormSubmit: (inputValues) => {
  api.changeAvatar(inputValues, avatarButton)
  .then((res) => {
    profile.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});
    popupError.classList.remove('popup_opened');
  })
  .catch((err) => {
    errorText.textContent = err;
    popupError.classList.add('popup_opened');
  });
}});
avatarForm.setEventListeners();
/** Обработчик изменения аватара */
editAvatarButton.addEventListener('click', () => {
  avatarForm.open();
  formEditAvatar.resetValidation();
});


