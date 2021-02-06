// Находим контейнер у которого будем менять значение display
const popup = document.querySelector('.popup');

// Находим кнопки, при нажатии на которые "попап" будет открываться и закрываться
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');

// Находим поля, куда будут подставлены новые значения из полей формы
let userName = document.querySelector('.profile__user-name');
let userJob = document.querySelector('.profile__user-specialization');

// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');


// Обработчик открытия "попапа"
const popupOpen = function () {
  // Открываем "попап" добавляя к нему модификатор ".popup_open" со свойством display:flex
  popup.classList.add('popup_open');

  // Добавляем в поля формы текст из профиля на странице
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Обработчик закрытия "попапа" без сохранения введеных данных
const popupClose = function () {
  // Прячем "попап" удаляя у него модификатор ".popup_open" со свойством display:flex
  popup.classList.remove('popup_open');
}

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Меняем содержимое в профиле на новое содержимое из полей формы
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  // Прячем "попап" удаляя у него модификатор ".popup_open" со свойством display:flex
  popupClose();
}

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const listContainerEl = document.querySelector('.todo__list')
const templateEl = document.querySelector('.template')
const addButtonEl = document.querySelector('.button_add')
const inputEl = document.querySelector('.input')



// События, которые будут происходить при нажатии на кнопки
popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

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
