export default class Card {
  constructor ({data, handleOpenImage, handleRemoveCard, handleLike}, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._user = data.owner._id;
    this._handleOpenImage = handleOpenImage;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLike = handleLike;
    this._templateSelector = templateSelector;
  }

  _getTemplate () {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return this._cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._elementLike = this._element.querySelector('.element__like')
    this._elementImage = this._element.querySelector('.element__image');
    this._deveteButton = this._element.querySelector('.element__delete-button')
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._checkLike();
    if(this._user !== 'e2bea12969d07f3a17cf7cd5'){
      this._deveteButton.remove();
    }
    return this._element;
  }
  _checkLike(){
    if(this._likes.length !== 0){
      this._element.querySelector('.element__like-numbers').textContent = this._likes.length;
    } else{
      this._element.querySelector('.element__like-numbers').textContent = '';
    }
    this._likes.forEach((like) => {
      if(like._id === 'e2bea12969d07f3a17cf7cd5'){
        this._elementLike.classList.add('element__like_active');
    }});

  }

  _setEventListeners(){
    this._elementLike.addEventListener('click', () => {
      if(!this._elementLike.classList.contains('element__like_active')){
        this._handleLike.handleSetLike(this._id, this._element);
        this._elementLike.classList.add('element__like_active');
      } else {
        this._handleLike.handleDeleteLike(this._id, this._element);
        this._elementLike.classList.remove('element__like_active');
      };
    });
    if(this._user === 'e2bea12969d07f3a17cf7cd5'){
      this._deveteButton.addEventListener('click', () => {
        this._handleRemoveCard(this._id, this._element);
      });
    }
    this._elementImage.addEventListener('click', () => {
      this._handleOpenImage();
    });
  }
}

