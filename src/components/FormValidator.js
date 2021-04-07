export default class FormValidator {
  constructor(options, formSelector) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formSelector = formSelector;

    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector)
  }

  _showInputError(inputElement, errorMessage) {

    // Находим элемент span с id как у инпута для текста ошибки
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;

    errorElement.classList.add(this._errorClass);

  }

  _hideInputError(inputElement) {

    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);

    errorElement.textContent = '';

  }

  toggleButtonState() {

    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _checkInputValidity(inputElement) {

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }

  };

  _setEventListeners() {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {

        this._checkInputValidity(inputElement);

        this.toggleButtonState(this._inputList, this._buttonElement);

      });
    });
  }

  cleanValid() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    });
  }

  enableValidation() {
    this._setEventListeners(this._formSelector)
  }
}
