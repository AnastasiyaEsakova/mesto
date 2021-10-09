import Popup from './Popup.js';
import {popupImageImage, popupImageCaption} from './utils.js';
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }
  open({name, link}){
    popupImageImage.src = link;
    popupImageImage.alt = name;
    popupImageCaption.textContent = name;
    super.open();
  }

}




