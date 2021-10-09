export default class Popup {
  constructor(popupSelector){
    this._popup = popupSelector;
    this._handleEsc = (evt) =>{
      this._handleEscClose(evt);
    }
  }
   open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEsc);
  }
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEsc);
  }
  _handleEscClose(evt){
      if (evt.key === 'Escape'){
        this.close();
    }
  }
  setEventListeners(){
    this._popup.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')){
        this.close();
        /**закрывает pop-up кликом по фону и крестику */
      }
    });

  }

}
