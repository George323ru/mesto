import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    super.setEventListeners()
  }

  open(img) {
    const popupImg = this._selector.querySelector('.popup__picture_type_img')
    popupImg.src = img.link;
    popupImg.alt = img.name;
    this._selector.querySelector('.popup__placeName_type_img').textContent = img.name;
    super.open(this._selector);
  }


}
