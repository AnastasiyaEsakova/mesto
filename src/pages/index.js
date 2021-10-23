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
  } from '../utils/constants.js';
let userId = '';

  /**API */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d',
    'Content-Type': 'application/json'
  }
});

const promises = [api.getInitialCards(), api.getProfileInfo()];
Promise.all(promises)
  .then((res) => {
    userId = res[1]._id;
    sectionCards.renderItem(res[0]);
    profile.setUserInfo(res[1]);
  })
  .catch((err) => {
    console.log(err);
  })

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
const profile = new UserInfo({nameElement:profileName, jobElement:profileJob, avatarElement: avatar});
const profileForm = new PopupWithForm(popupProfile, {handleFormSubmit: (inputValues)=>{
  api.setProfileInfo(inputValues)
  .then((data) => {
    profile.setUserInfo({name: data.name, about: data.about, avatar: data.avatar});
    profileForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profileForm.renderLoading(false);
  });
}});
 profileForm.setEventListeners();
/** Обработчик кнопки редактирования профиля */
editProfileButton.addEventListener('click', () => {
  formProfile.resetValidation();
  insertValues(profile.getUserInfo());
  profileForm.open();
});

/**CARDS */
/** Создание экземляра класса Card */
const createCopyCard = (data) => {
   const card =  new Card({data, userId,
    handleOpenImage: () => {
      popupImage.open({name: data.name, link: data.link});
    },
    handleRemoveCard: (id, element) => {
      popupDeleteImage.open();
      popupDeleteImage.getCard(id, element);
    },
    handleLike:{
      handleSetLike: (id) => {
        api.setLike(id)
        .then((res) => {
          card.updateLikes(res.likes.length);
      })
        .catch(err => {
          console.log(err);
      })
    },
      handleDeleteLike: (id) => {
        api.deleteLIke(id)
        .then((res) => {
          card.updateLikes(res.likes.length);
      })
        .catch(err => {
          console.log(err);
      });
  }
   }},'#card');
   return card.generateCard()
};

const sectionCards = new Section({renderer: (item) => {
  sectionCards.addItem(createCopyCard(item));
}}, '.elements');


/** Форма добавления новой карточки */
const addFhotoForm = new PopupWithForm(popupPlace, {handleFormSubmit: (inputValues) =>{
  api.setNewCard(inputValues)
  .then((data) => {
    sectionCards.addNewItem(createCopyCard(data));
    addFhotoForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    addFhotoForm.renderLoading(false);
  });
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
      popupDeleteImage.close();
    })
    .catch(err => {
      console.log(err);
    });
  }
});
popupDeleteImage.setEventListeners();

//**AVATAR */
/** Форма редактирования аватара */
const avatarForm = new PopupWithForm(popupAvatar, {handleFormSubmit: (inputValues) => {
  api.changeAvatar(inputValues)
  .then((res) => {
    profile.setUserInfo({avatar: res.avatar, name: res.name, about: res.about});
    avatarForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarForm.renderLoading(false);
  });
}});
avatarForm.setEventListeners();
/** Обработчик изменения аватара */
editAvatarButton.addEventListener('click', () => {
  avatarForm.open();
  formEditAvatar.resetValidation();
});

