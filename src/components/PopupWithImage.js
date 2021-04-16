import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    super.setEventListeners()

    this._popupCardImage = this._popupElement.querySelector('.popup__picture_type_img')
    this._popupCardTitle = this._popupElement.querySelector('.popup__placeName_type_img')
  }

  open(img) {
    this._popupCardImage.src = img.link;
    this._popupCardTitle.textContent = img.name;
    this._popupCardImage.alt = img.name;

    super.open();
  }
}
