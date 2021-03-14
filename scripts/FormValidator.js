export const enableValidation = [{
  // formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveBtn',
  inactiveButtonClass: 'popup__saveBtn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}];

// Валидация формы
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
    // // Создаем массив из всех форм
    // const formList = Array.from(document.querySelectorAll(this._formSelector));
    // // На элементы каждой формы навешиваем событие
    // formList.forEach((formElement) => {
    //   this._setEventListeners(formElement)
    // });

    this._setEventListeners(this._formSelector)
  }
}

// // Перебираем исходный массив с данными
// enableValidation.forEach((item) => {
//   // Наполняем данными шаблон класса Card
//   const valid = new FormValidator(item, formPopupProfile); // item - передаем данные в виде объекта
//   // Вызываем метод в созданном выше экземпляре для создания новой карточки
//   valid.enableValidation();
// });

// // Показываем сообщение с ошибкой
// const showInputError = (formElement, inputElement, errorMessage, options) => {
//   // Находим элемент span с id как у инпута для текста ошибки
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(options.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   // Добавляем класс для появления ошибки
//   errorElement.classList.add(options.errorClass);
// };

// // Прячем сообщение с ошибкой
// const hideInputError = (formElement, inputElement, options) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(options.inputErrorClass);
//   errorElement.classList.remove(options.errorClass);
//   errorElement.textContent = '';
// };

// // Обработчик состояния кнопки
// const toggleButtonState = (inputList, buttonElement, options) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute('disabled', true);
//     buttonElement.classList.add(options.inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(options.inactiveButtonClass);
//   }
// }

// // Проверяем инпуты на валидность
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }

// // Проверяем все "инпуты" на валидность для показа сообщения об ошибке
// const checkInputValidity = (formElement, inputElement, options) => {
//   // Условие, при которых будет показана ошибка
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, options);
//   } else {
//     hideInputError(formElement, inputElement, options);
//   }
// };

// // События для формы
// const setEventListeners = (formElement, options) => {
//   // Отменяем стандартную отправку формы
//   formElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//   });

//   // Создаем массив из всех "инпутов"
//   const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
//   const buttonElement = formElement.querySelector(options.submitButtonSelector)

//   toggleButtonState(inputList, buttonElement, options);

//   // На каждый "инпут" навешиваем событие
//   inputList.forEach(inputElement => {
//     inputElement.addEventListener('input', (evt) => {
//       // Проверка инпута на валидность
//       checkInputValidity(formElement, inputElement, options);
//       // Блокировка кнопки sumbit в случае не валидности одного из полей ввода
//       toggleButtonState(inputList, buttonElement, options);
//     });
//   });
// };

// const enableValidation = (options) => {
//   // Создаем массив из всех форм
//   const formList = Array.from(document.querySelectorAll(options.formSelector));

//   // На элементы каждой формы навешиваем событие
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, options);
//   });
// }
