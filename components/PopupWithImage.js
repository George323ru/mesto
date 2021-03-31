import Popup from './Popup.js'
import {
  popupEx
} from '../pages/index.js'

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }

  open(img) {
    console.log('hi')
    const popupImg = this._selector.querySelector('.popup__picture_type_img')
    popupImg.src = img.link;
    popupImg.alt = img.name;
    this._selector.querySelector('.popup__placeName_type_img').textContent = img.name;
    popupEx.open(this._selector);
  }
}
