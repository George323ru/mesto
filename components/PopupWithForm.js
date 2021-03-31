import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({
    selectorPopup,
    handleFormSubmit
  }) {
    super(selectorPopup);

    this._form = document.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  // Собираем данные всех полей формы
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    });

    return this._formValues;
  }

  setEventListeners() {
    // Навешиваем слушатель клика по иконке закрытия попапа
    super.setEventListeners();

    // при сабмите формы
    this._form.addEventListener('submit', (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();
      console.log(this._selector)
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    })
  }
}
