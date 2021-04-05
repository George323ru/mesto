import {
  escCode,
  popup
} from '../utils/constants.js'

export default class Popup {
  constructor(selectorPopup) {
    this._selector = selectorPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Открытие попапа
  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
    this._selector.addEventListener('pointerdown', this._handleEscClose)
  }

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === escCode || evt.target === this._selector) {
      console.log('нажтие на кнопку Esc')
      this.close();
    }
  }

  setEventListeners() {
    this._selector.querySelector('.popup__closeButton').addEventListener('click', () => this.close(this._selector));
  }
}
