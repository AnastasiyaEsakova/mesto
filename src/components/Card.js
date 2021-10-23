export default class Card {
  constructor ({data, userId, handleOpenImage, handleRemoveCard, handleLike}, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardUserId = data.owner._id;
    this._user = userId;
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
    if(this._user !== this._cardUserId){
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
      if(like._id === this._user){
        this._elementLike.classList.add('element__like_active');
    }});
  }
  _setEventListeners(){
    this._elementLike.addEventListener('click', () => {
      if(!this._elementLike.classList.contains('element__like_active')){
        this._handleLike.handleSetLike(this._id);
      } else {
        this._handleLike.handleDeleteLike(this._id);
      };
    });
    if(this._user === this._cardUserId){
      this._deveteButton.addEventListener('click', () => {
        this._handleRemoveCard(this._id, this._element);
      });
    }
    this._elementImage.addEventListener('click', () => {
      this._handleOpenImage();
    });
  }
  updateLikes(likes){
    this._elementLike.classList.toggle('element__like_active');
    if(likes !== 0){
      this._element.querySelector('.element__like-numbers').textContent = likes;
    } else{
      this._element.querySelector('.element__like-numbers').textContent = '';
    }
  }
}

