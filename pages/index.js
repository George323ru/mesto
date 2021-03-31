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
  profileUserName,
  profileUserJob,
  popupProfileFormEL,
  popupProfileInputTypeName,
  popupProfileInputTypeJob,
  popupNewPlaceAddBtn,
  popupNewPlace,
  popupNewPlaceForm,
  popupNewPlaceCloseBtn,
  elementListContainer,
  elementsMsgNoElements,
  templateEl,
  popupImg,
  popupImgCloseBtn,
  settingsValidation
} from '../utils/constants.js'



// Обработчик закрытия "попапа" через Overlay
popup.forEach((popupElement) => {

  addEventListener('click', e => {

    if (e.target.classList.contains('popup')) {

      popupEx.close(popupElement)

    }
  })
})

function createCard(item, cardSelector, handleCardClick) {

  const card = new Card(item, cardSelector, handleCardClick);

  return card.generateCard();

}


// Наполняем DOM экземплярами класса Section
const listItems = new Section({

  data: initialCards,
  renderer: (item) => {

    const cardElement = createCard(
      item,
      templateEl,
      () => {
        // Передаем ф-ию открытия попапа с картинкой
        popupWI.open(item)
      }

    );

    listItems.addItem(cardElement)

  }
}, '.elements__element-list')

// запускаем отрисовку
listItems.renderItems()


const handleOpenPopupProfile = function () {

  popupEx.open(popupProfile)

  popupProfileInputTypeName.value = userData.getUserInfo().name.textContent;
  popupProfileInputTypeJob.value = userData.getUserInfo().job.textContent;

}

popupProfileOpenBtn.addEventListener('click', handleOpenPopupProfile);



const popupProfileValid = new FormValidator(settingsValidation, popupProfileFormEL);
popupProfileValid.enableValidation();

const popupAddCardValid = new FormValidator(settingsValidation, popupNewPlaceForm);
popupAddCardValid.enableValidation();


export function handleMsgNoElements() {

  if (elementListContainer.children.length === 0) {
    elementsMsgNoElements.classList.add('elements__msgNoElements_active')
  } else {
    elementsMsgNoElements.classList.remove('elements__msgNoElements_active')
  }
}






popupNewPlaceAddBtn.addEventListener('click', () => popupEx.open(popupNewPlace))


popupImgCloseBtn.addEventListener('click', () => popupEx.close(popupImg))



// Экземпляр класса для попапа профиля
export const popupEx = new Popup(popupProfile);

// Попап для картинки
const popupWI = new PopupWithImage(popupImg)

// Создаем экземпляр класса с данными пользователя
const userData = new UserInfo({
  name: profileUserName,
  job: profileUserJob
})


// Создаем экземпляр класса попапа с формой для попапа профиля, передаем селектор и то, что будет происходить при сабмите
const popupFormP = new PopupWithForm({
  selectorPopup: popupProfile,
  handleFormSubmit: (formData) => {

    // При сабмите мы вставляем данные пользователя обратно в форму
    userData.setUserInfo(

      formData.popupProfileInputTypeName,
      formData.popupProfileInputTypeJob

    );

    popupEx.close(popupProfile);
  }
})
popupFormP.setEventListeners()

const popupAddCardForm = new PopupWithForm({

  selectorPopup: popupNewPlace,
  handleFormSubmit: (formData) => {

    const name = formData.popupNewPlaceInputTypeName;
    const link = formData.popupNewPlaceInputTypeLink;

    const listItem = createCard({
        name,
        link
      }, templateEl,
      () => {

        // Передаем ф-ию открытия попапа с картинкой
        popupWI.open({
          name,
          link
        })

      });

    // Добавляем новую карточку в DOM
    elementListContainer.prepend(listItem);

    popupEx.close(popupNewPlace);
  }
})

popupAddCardForm.setEventListeners()
