export default class Card {
  constructor ({name, link, handleOpenImage}, templateSelector){
    this._name = name;
    this._link = link;
    this._handleOpenImage = handleOpenImage;
    this._templateSelector = templateSelector;
  }

  _getTemplate () {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return this._cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
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
      this._handleOpenImage();
    });
  }

  _handleLike(){
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  _handleRemoveCard(){
    this._element.remove();
    this._element = '';
  }
}

