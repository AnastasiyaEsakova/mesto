const popupImageImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('#popup_type_image');
import openPopup from './index.js';

export default class Card {
  constructor (name, link){
    this._name = name;
    this._link = link;
  }

  _getTemplate () {
    const cardElement = document.querySelector('#card').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  _setEventListeners(){
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleRemoveCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopupImage();
    });
  }

  _handleLike(){
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  _handleRemoveCard(){
    this._element.remove();
  }
  _handleOpenPopupImage(){
    openPopup(popupImage);
    popupImageImage.src = this._link;
    popupImageImage.alt = this._name;
    popupImageCaption.textContent = this._name;
  }
}


