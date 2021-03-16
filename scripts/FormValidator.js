export default class FormValidator {
  constructor(options, formSelector) {
    // this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formSelector = formSelector;
  }

  // Показываем сообщение с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    // Находим элемент span с id как у инпута для текста ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    // Добавляем класс для появления ошибки
    errorElement.classList.add(this._errorClass);
  }

  // Прячем сообщение с ошибкой
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Обработчик состояния кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // Проверяем инпуты на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Проверяем все "инпуты" на валидность для показа сообщения об ошибке
  _checkInputValidity(formElement, inputElement) {
    // Условие, при которых будет показана ошибка
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners(formElement) {
    // Отменяем стандартную отправку формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // Создаем массив из всех "инпутов"
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector)

    this._toggleButtonState(inputList, buttonElement);

    // На каждый "инпут" навешиваем событие
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        // Проверка инпута на валидность
        this._checkInputValidity(formElement, inputElement);
        // Блокировка кнопки sumbit в случае не валидности одного из полей ввода
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formSelector)
  }
}
