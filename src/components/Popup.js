import {
  escCode
} from '../utils/constants.js'

export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Открытие попапа
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
    this._popupElement.addEventListener('pointerdown', this._handleEscClose)
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === escCode || evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__closeButton').addEventListener('click', () => this.close());
  }
}
