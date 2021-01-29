const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');

let userName = document.querySelector('.profile__user-name');
let userSpec = document.querySelector('.profile__user-specialization');
let inputName = popup.querySelector('.popup__input-name');
let inputSpec = popup.querySelector('.popup__input-specialization');

const popupToggle = function (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_open');
  inputName.value = userName.textContent;
  inputSpec.value = userSpec.textContent;
}

const popupSave = function (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_open');

  userName.textContent = ` ${inputName.value} `;
  userSpec.textContent = ` ${inputSpec.value} `;
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupSaveButton.addEventListener('click', popupSave);

// console.log(inputName)

// // Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// let nameInput = // Воспользуйтесь инструментом .querySelector()
// let jobInput = // Воспользуйтесь инструментом .querySelector()

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formSubmitHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                                                 // Так мы можем определить свою логику отправки.
//                                                 // О том, как это делать, расскажем позже.

//     // Получите значение полей jobInput и nameInput из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);
