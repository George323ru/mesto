import {
  escCode
} from '../utils/constants.js'

export default class Popup {
  constructor(selectorPopup) {
    this._selector = selectorPopup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Открытие попапа
  open(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)

  }

  close(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === escCode) {
      console.log('нажтие на кнопку Esc')
      const openedPopup = document.querySelector('.popup_opened');
      console.log(openedPopup)
      this.close(openedPopup);
    }
  }

  setEventListeners() {
    this._selector.querySelector('.popup__closeButton').addEventListener('click', () => this.close(this._selector));
  }
}
