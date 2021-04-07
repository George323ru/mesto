import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
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
  elementListContainerSelector,
  templateEl,
  popupImg,
  settingsValidation
} from '../utils/constants.js';
import '../pages/index.css';


function createCard(item, templateSelector, handleCardClick) {

  const card = new Card(item, templateSelector, handleCardClick);

  return card.generateCard();

}

const popupWithImg = new PopupWithImage(popupImg)

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
}, elementListContainerSelector)

// запускаем отрисовку
listItems.renderItems()

const popupProfileValid = new FormValidator(settingsValidation, popupProfileFormEL);
popupProfileValid.enableValidation();

const popupAddCardValid = new FormValidator(settingsValidation, popupNewPlaceForm);
popupAddCardValid.enableValidation();


const handleOpenPopupProfile = function () {

  popupProfileForm.open()
  popupProfileValid.cleanValid()

  popupProfileInputTypeName.value = userData.getUserInfo().name.textContent;
  popupProfileInputTypeJob.value = userData.getUserInfo().job.textContent;

}

popupProfileOpenBtn.addEventListener('click', handleOpenPopupProfile);
popupNewPlaceAddBtn.addEventListener('click', () => {
  popupAddCardForm.open();
  popupAddCardValid.cleanValid()
})






const userData = new UserInfo({
  name: profileUserName,
  job: profileUserJob
})

const popupProfileForm = new PopupWithForm({
  popupElement: popupProfile,
  handleFormSubmit: (formData) => {

    // При сабмите мы вставляем данные пользователя обратно в форму
    userData.setUserInfo(

      formData.popupProfileInputTypeName,
      formData.popupProfileInputTypeJob

    );

    popupProfileForm.close();
    popupProfileValid.toggleButtonState()


  }
})
popupProfileForm.setEventListeners()


const popupAddCardForm = new PopupWithForm({

  popupElement: popupNewPlace,
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

    popupAddCardForm.close();
    popupAddCardValid.toggleButtonState()
  }
})

popupAddCardForm.setEventListeners()
