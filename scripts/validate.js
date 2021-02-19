// Валидация формы

// Показываем сообщение с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // console.log(errorMessage)
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Прячем сообщение с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Проверяем "инпуты" на валидность
const checkInputValidity = (formElement, inputElement) => {
  const isInputElNotValid = !inputElement.validity.valid;

  // Условия, при которых будет показана ошибка
  if (isInputElNotValid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('form__submit_inactive');
//   } else {
//     buttonElement.classList.remove('form__submit_inactive');
//   }
// }

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const setEventListeners = (formElement) => {
  // Отменяем стандартную отправку формы
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // Создаем массив из всех "инпутов"
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // const buttonElement = formElement.querySelector('.popup__save-button')

  // toggleButtonState(inputList, buttonElement);

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

  // На каждую форму навешиваем событие
  formList.forEach(setEventListeners)
}

enableValidation();
