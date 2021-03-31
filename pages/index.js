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

      popupProfileForm.close(popupElement)

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
        popupWithImg.open(item)
      }

    );

    listItems.addItem(cardElement)

  }
}, '.elements__element-list')

// запускаем отрисовку
listItems.renderItems()


const handleOpenPopupProfile = function () {

  popupProfileForm.open(popupProfile)

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


popupNewPlaceAddBtn.addEventListener('click', () => popupAddCardForm.open(popupNewPlace))

const popupWithImg = new PopupWithImage(popupImg)

const userData = new UserInfo({
  name: profileUserName,
  job: profileUserJob
})

const popupProfileForm = new PopupWithForm({
  selectorPopup: popupProfile,
  handleFormSubmit: (formData) => {

    // При сабмите мы вставляем данные пользователя обратно в форму
    userData.setUserInfo(

      formData.popupProfileInputTypeName,
      formData.popupProfileInputTypeJob

    );

    popupProfileForm.close(popupProfile);
  }
})
popupProfileForm.setEventListeners()

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

        popupWithImg.open({
          name,
          link
        })

      });

    elementListContainer.prepend(listItem);

    popupAddCardForm.close(popupNewPlace);
  }
})

popupAddCardForm.setEventListeners()
