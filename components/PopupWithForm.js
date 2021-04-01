import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({
    selectorPopup,
    handleFormSubmit
  }) {
    super(selectorPopup);

    this._form = this._selector.querySelector(".popup__form");

    this._inputList = this._form.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    })
  }
}
