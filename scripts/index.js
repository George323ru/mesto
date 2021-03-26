import Card from './Card.js';
import FormValidator from './FormValidator.js'

// Шесть карточек «из коробки», которые сразу добавляются на главную страницу
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Тюмень',
    link: 'https://sdelanounas.ru/i/a/w/1/f_aW1nLmdlbGlvcGhvdG8uY29tL3Rtbi81NV90dW1lbi5qcGc_X19pZD0xMTM2MjM=.jpeg'
  },
  {
    name: 'Сургут',
    link: 'https://barcaffe.ru/wp-content/uploads/2020/07/28_surgut2020.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://im0-tub-ru.yandex.net/i?id=ba9010e38898e7d960c5374cc0f0d746-l&n=13'
  }
];

const settingsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveBtn',
  inactiveButtonClass: 'popup__saveBtn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Находим все попапы
const popup = document.querySelectorAll('.popup')
// Находим контейнер с попапом
const popupProfile = document.querySelector('.popup_type_profile');
// Находим кнопки, при нажатии на которые попап будет открываться и закрываться
const popupProfileOpenBtn = document.querySelector('.profile__editBtn');
const popupProfileCloseBtn = popupProfile.querySelector('.popup__closeButton_type_profile');
// Находим поля, куда будут подставлены новые значения из полей формы
const profileUserName = document.querySelector('.profile__user-name');
const profileUserJob = document.querySelector('.profile__userJob');
// Находим форму в DOM
const popupProfileFormEL = popupProfile.querySelector('.popup__form_type_profile');
// Находим поля формы в DOM
const popupProfileInputTypeName = popupProfile.querySelector('.popup__input_type_profileName');
const popupProfileInputTypeJob = popupProfile.querySelector('.popup__input_type_profileJob');
// Находим кнопку открытия попапа для добавления нового места
const popupNewPlaceAddBtn = document.querySelector('.profile__add-button')
// Находим попап добавления нового места вместе с формой
const popupNewPlace = document.querySelector('.popup_type_newPlace')
const popupNewPlaceForm = popupNewPlace.querySelector('.popup__form_type_newPlace')
// Находим поля ввода названия и ссылки новой карточки
const popupNewPlaceInputName = popupNewPlace.querySelector('.popup__input_type_newPlaceTypeName')
const popupNewPlaceInputLink = popupNewPlace.querySelector('.popup__input_type_newPlaceTypeLink')
// Находим кнопку закрытия и отправки формы попапа
const popupNewPlaceCloseBtn = popupNewPlace.querySelector('.popup__closeButton_type_newPlace')
const submitBtn = popupNewPlaceForm.querySelector('.popup__saveBtn')
// Находим ту секцию, куда будем добавлять карточки из массива и новые пользовательские карточки
const elementListContainer = document.querySelector('.elements__element-list')
const elementsMsgNoElements = document.querySelector('.elements__msgNoElements')
// Находим код шаблона, по которому будем создавать новые карточки
const templateEl = '.templateEl';
// Находим попап, в котором будет появляться картинка в увеличенном виде
export const popupImg = document.querySelector('.popup_type_img')
// Находим кнопку закрытия попапа с увеличенной картинкой
const popupImgCloseBtn = popupImg.querySelector('.popup__closeButton_type_img')
// Находим картинку и заголовок карточки, которая будет увеличена
export const popupImgPicEl = popupImg.querySelector('.popup__picture_type_img')
export const popupImgNameEl = popupImg.querySelector('.popup__placeName_type_img')
// Код клавиши Escape
const escCode = 'Escape';

// Обработчик открытия "попапа"
export const handleOpenPopup = function (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc)
}

// Обработчик закрытия "попапа"
const handleClosePopup = function (element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
}

// Обработчик закрытия "попапа" через Overlay
popup.forEach((popupElement) => {
  addEventListener('click', e => {
    if (e.target.classList.contains('popup')) {
      handleClosePopup(popupElement);
    }
  })
})

function closeByEsc(evt) {
  if (evt.key === escCode) {
    const openedPopup = document.querySelector('.popup_opened');
    handleClosePopup(openedPopup);
  }
}

// Обработчик открытия формы
const handleOpenPopupProfile = function () {
  handleOpenPopup(popupProfile);

  // Добавляем в поля формы текст из профиля на странице
  popupProfileInputTypeName.value = profileUserName.textContent;
  popupProfileInputTypeJob.value = profileUserJob.textContent;
}

// Обработчик создания карточек по шаблону класса Card
function createCard(item, cardSelector) {
  // Наполняем шаблон класса данными
  const card = new Card(item, cardSelector);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

// Запускаем валидацию форм
const popupProfileValid = new FormValidator(settingsValidation, popupProfileFormEL);
popupProfileValid.enableValidation();
const popupAddCardValid = new FormValidator(settingsValidation, popupNewPlaceForm);
popupAddCardValid.enableValidation();

// Обработчик «отправки» формы
function handleFormProfile(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Меняем содержимое в профиле на новое содержимое из полей формы
  profileUserName.textContent = popupProfileInputTypeName.value;
  profileUserJob.textContent = popupProfileInputTypeJob.value;

  // Прячем "попап"
  handleClosePopup(popupProfile);
}

// Форма добавления новой карточки на станицу
function handleFormAddCard(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Сохраняем значения, полученные из input'ов формы
  const inputText = popupNewPlaceInputName.value;
  const inputSrc = popupNewPlaceInputLink.value;
  const inputListForm = {
    name: inputText,
    link: inputSrc
  }

  const listItem = createCard(inputListForm, templateEl);
  // Добавляем новую карточку в DOM
  elementListContainer.prepend(listItem);

  // Проверяем, есть ли надпись "Нет элементов"
  handleMsgNoElements()
  // Очищаем input формы
  popupNewPlaceForm.reset();
  // Деактивация кнопки submit
  popupAddCardValid.toggleButtonState();
  // Закрываем popup
  handleClosePopup(popupNewPlace)
}

// Обработчик добавления сообщения "Нет элементов"
export function handleMsgNoElements() {
  if (elementListContainer.children.length === 0) {
    elementsMsgNoElements.classList.add('elements__msgNoElements_active')
  } else {
    elementsMsgNoElements.classList.remove('elements__msgNoElements_active')
  }
}

// События, которые будут происходить при нажатии на кнопки
popupProfileOpenBtn.addEventListener('click', handleOpenPopupProfile);
popupProfileCloseBtn.addEventListener('click', () => handleClosePopup(popupProfile));
popupProfileFormEL.addEventListener('submit', handleFormProfile);
popupNewPlaceAddBtn.addEventListener('click', () => handleOpenPopup(popupNewPlace))
// Кнопка закрытия формы добавления нового места
popupNewPlaceForm.addEventListener('submit', handleFormAddCard)
// Кнопка закрытия попапа нового места
popupNewPlaceCloseBtn.addEventListener('click', () => handleClosePopup(popupNewPlace))
// Кнопка закрытия попапа с картинкой
popupImgCloseBtn.addEventListener('click', () => handleClosePopup(popupImg))

// // Перебираем исходный массив с данными
// initialCards.forEach((item) => {
//   const cardElement = createCard(item, templateEl);
//   // Вставляем новую карточку в разметку DOM
//   elementListContainer.append(cardElement);
// });


class Section {
  constructor({
    data,
    renderer
  }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Вставляем в разметку
  addItem(element) {
    this._container.append(element);
  }

  //Преобразуем массив с данными
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);

    });
  }

}

const listItems = new Section({
  // Массив с данными
  data: initialCards,
  // Передаем код ф-ии, который будет преобразовывать каждый элемент
  renderer: (item) => {
    const cardElement = createCard(item, templateEl);
    // Вставляем в разметку
    listItems.addItem(cardElement)
  }
}, '.elements__element-list')

console.log(listItems)
listItems.renderItems()

class Popup {
  constructor(selectorPopup) {
    this._selector = selectorPopup;
  }

  open() {

  }

  close() {

  }

  _handleEscClose() {

  }

  setEventListeners() {

  }
}
