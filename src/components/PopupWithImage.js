import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    super.setEventListeners()
  }

  open(img) {
    const popupImg = this._popupElement.querySelector('.popup__picture_type_img')
    popupImg.src = img.link;
    popupImg.alt = img.name;
    this._popupElement.querySelector('.popup__placeName_type_img').textContent = img.name;
    super.open();
  }
}
