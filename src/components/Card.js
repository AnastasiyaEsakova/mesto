export default class Card {
  constructor ({data, handleOpenImage, handleRemoveCard, handleLike}, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._user = data.owner._id;
    this._handleOpenImage = handleOpenImage;
    this._handleRemoveCard = handleRemoveCard;
    this._templateSelector = templateSelector;
    this._handleLike = handleLike;
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
    if(this._likes.length !== 0){
      this._element.querySelector('.element__like-numbers').textContent = this._likes.length;
      this._likes.forEach((like) => {
        if(like._id === this._user){
          this._elementLike.classList.add('element__like_active');
        }
      });
    } else{
      this._element.querySelector('.element__like-numbers').textContent = '';
    }
    if(this._user !== this._user){
      this._element.querySelector('.element__delete-button').remove();
    }
    return this._element;
  }

  _setEventListeners(){
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLike.addEventListener('click', () => {
      if(this._elementLike.classList.contains('element__like_active')){
        this._handleLike.handleDeleteLike(this._id);
        this._elementLike.classList.remove('element__like_active');
        this.generateCard();
      } else {
        this._handleLike.handleSetLike(this._id);
        this._elementLike.classList.add('element__like_active');
      }
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleRemoveCard(this._id);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImage();
    });
  }

  // _handleLike(){
  //   this._element.querySelector('.element__like').classList.toggle('element__like_active');
  // }
  // _handleRemoveCard(){
  //   this._element.remove();
  //   this._element = '';
  // }
}

