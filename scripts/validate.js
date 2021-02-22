// Валидация формы

// Показываем сообщение с ошибкой
const showInputError = (formElement, inputElement, errorMessage, options) => {
  // Находим элемент span с id как у инпута для текста ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  // Добавляем класс для появления ошибки
  errorElement.classList.add(options.errorClass);
};

// Прячем сообщение с ошибкой
const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

// Обработчик состояния кнопки
const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(options.inactiveButtonClass);
  }
}

// Проверяем инпуты на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Проверяем все "инпуты" на валидность для показа сообщения об ошибке
const checkInputValidity = (formElement, inputElement, options) => {
  // Условие, при которых будет показана ошибка
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

// События для формы
const setEventListeners = (formElement, options) => {

  // Создаем массив из всех "инпутов"
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, options);

  // На каждый "инпут" навешиваем событие
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      // Проверка инпута на валидность
      checkInputValidity(formElement, inputElement, options);
      // Блокировка кнопки sumbit в случае не валидности одного из полей ввода
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  // Создаем массив из всех форм
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  // На элементы каждой формы навешиваем событие
  formList.forEach((formElement) => {
    // Отменяем стандартную отправку формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

// enableValidation();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveBtn',
  inactiveButtonClass: 'popup__saveBtn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
