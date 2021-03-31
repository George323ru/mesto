import {
  escCode
} from '../utils/constants.js'

// Класс Popup, отвечает за открытие и закрытие popup
export default class Popup {
  constructor(selectorPopup) {
    this._selector = selectorPopup;
  }

  // Открытие попапа
  open(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    })
  }

  // Закрытие попапа
  close(element) {

    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    })
  }

  // Логика закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === escCode) {
      console.log('нажтие на кнопку Esc')
      const openedPopup = document.querySelector('.popup_opened');
      console.log(openedPopup)
      this.close(openedPopup);
    }
  }

  // Добавляем слушатель клика иконке закрытия попапа
  setEventListeners() {

    this._selector.querySelector('.popup__closeButton').addEventListener('click', () => this.close(this._selector));
  }
}
