import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import {
  initialCards,
  popup,
  popupProfile,
  popupProfileOpenBtn,
  popupProfileCloseBtn,
  profileUserName,
  profileUserJob,
  popupProfileFormEL,
  popupProfileInputTypeName,
  popupProfileInputTypeJob,
  popupNewPlaceAddBtn,
  popupNewPlace,
  popupNewPlaceForm,
  popupNewPlaceInputName,
  popupNewPlaceInputLink,
  popupNewPlaceCloseBtn,
  submitBtn,
  elementListContainer,
  elementsMsgNoElements,
  templateEl,
  popupImg,
  popupImgCloseBtn,
  popupImgPicEl,
  popupImgNameEl,
  escCode,
  settingsValidation
} from '../utils/constants.js'

// Обработчик закрытия "попапа" через Overlay
popup.forEach((popupElement) => {
  addEventListener('click', e => {
    if (e.target.classList.contains('popup')) {
      // handleClosePopup(popupElement);
      popupEx.close(popupElement)
    }
  })
})

// Обработчик создания карточек по шаблону класса Card
function createCard(item, cardSelector, handleCardClick) {
  // Наполняем шаблон класса данными
  const card = new Card(item, cardSelector, handleCardClick);
  // Создаём карточку и возвращаем наружу
  return card.generateCard();
}

// Создаем экземпляр класса Section
const listItems = new Section({
  // Массив с данными
  data: initialCards,
  // Передаем код ф-ии, который будет преобразовывать каждый элемент
  renderer: (item) => {
    const cardElement = createCard(item, templateEl,
      () => {
        console.log(item)
        popupWI.open(item)
      }
    );
    // Вставляем в разметку
    listItems.addItem(cardElement)
  }
}, '.elements__element-list')

// запускаем отрисовку
listItems.renderItems()

// Обработчик открытия формы
const handleOpenPopupProfile = function () {
  // handleOpenPopup(popupProfile);
  popupEx.open(popupProfile)

  // Добавляем в поля формы текст из профиля на странице
  popupProfileInputTypeName.value = profileUserName.textContent;
  popupProfileInputTypeJob.value = profileUserJob.textContent;
}
popupProfileOpenBtn.addEventListener('click', handleOpenPopupProfile);

// Обработчик «отправки» формы с профилем
function handleFormProfile(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Меняем содержимое в профиле на новое содержимое из полей формы
  profileUserName.textContent = popupProfileInputTypeName.value;
  profileUserJob.textContent = popupProfileInputTypeJob.value;

  // Прячем "попап"
  // handleClosePopup(popupProfile);
  popupEx.close(popupProfile)
}
popupProfileFormEL.addEventListener('submit', handleFormProfile);

// Запускаем валидацию для формы с профилем
const popupProfileValid = new FormValidator(settingsValidation, popupProfileFormEL);
popupProfileValid.enableValidation();
// Запускаем валидацию для формы с добавлением нового места
const popupAddCardValid = new FormValidator(settingsValidation, popupNewPlaceForm);
popupAddCardValid.enableValidation();


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
  popupEx.close(popupNewPlace)
}
// Кнопка закрытия формы добавления нового места
popupNewPlaceForm.addEventListener('submit', handleFormAddCard)

// Обработчик добавления сообщения "Нет элементов"
export function handleMsgNoElements() {
  if (elementListContainer.children.length === 0) {
    elementsMsgNoElements.classList.add('elements__msgNoElements_active')
  } else {
    elementsMsgNoElements.classList.remove('elements__msgNoElements_active')
  }
}

// // События, которые будут происходить при нажатии на кнопки
popupProfileCloseBtn.addEventListener('click', () => popupEx.close(popupProfile));
popupNewPlaceAddBtn.addEventListener('click', () => popupEx.open(popupNewPlace))
// Кнопка закрытия попапа нового места
popupNewPlaceCloseBtn.addEventListener('click', () => popupEx.close(popupNewPlace))
// Кнопка закрытия попапа с картинкой
popupImgCloseBtn.addEventListener('click', () => popupEx.close(popupImg))


// Экземпляр класса для попапа профиля
export const popupEx = new Popup(popupProfile);

// попап для картинки
const popupWI = new PopupWithImage(popupImg)
