import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }
  open({place, link}){
    this._image.src = link;
    this._image.alt = place;
    this._caption.textContent = place;
    super.open();
  }

}




