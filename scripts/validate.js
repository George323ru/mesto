// Валидация формы

// Показываем сообщение с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // console.log(errorMessage)
  // Находим элемент span с id как у инпута для текста ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  // Добавляем класс для появления ошибки
  errorElement.classList.add('popup__input-error_active');
};

// Прячем сообщение с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// Обработчик состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Проверяем "инпуты" на валидность
const checkInputValidity = (formElement, inputElement) => {
  // Условие, при которых будет показана ошибка
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Отменяем стандартную отправку формы
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // Создаем массив из всех "инпутов"
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__saveBtn')

  toggleButtonState(inputList, buttonElement);

  // На каждый "инпут" навешиваем событие
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {

      checkInputValidity(formElement, inputElement);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Создаем массив из всех форм
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // На элементы каждой формы навешиваем событие
  formList.forEach(setEventListeners)
}

enableValidation();
