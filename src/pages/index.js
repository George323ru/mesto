import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmButton from '../components/PopupWithConfirmButton.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {
  popupProfile,
  popupProfileOpenBtn,
  profileUserName,
  profileUserJob,
  profileAvatarImage,
  profileAvatarButton,
  popupProfileFormEL,
  popupProfileInputTypeName,
  popupProfileInputTypeJob,
  popupNewPlaceAddBtn,
  popupNewPlace,
  popupNewPlaceForm,
  popupConfirmDeleteCard,
  popupChangeAvatar,
  popupChangeAvatarForm,
  elementListContainer,
  elementListContainerSelector,
  templateEl,
  popupImg,
  settingsValidation
} from '../utils/constants.js';
import '../pages/index.css';

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: '59e52716-d825-43a0-9822-26cced8398ed'
})

api.getCards()
  .then(cards => {
    listItems.renderItems(cards)
  })
  .catch(err => {
    console.log('Ошибка при получении карточек с сервера')
  })

api.getUserInfo()
  .then(info => {
    profileAvatarImage.src = info.avatar;
    userData.setUserInfo(info.name, info.about, info._id)
  })
  .catch(err => {
    console.log('Ошибка при получении информации о пользователе')
  })

function createCard(item,
  templateSelector,
  anyOwnerId,
  handleCardClick,
  handlePopupConfirmDelete,
  handlePutCardLike) {

  const card = new Card(item,
    templateSelector,
    anyOwnerId,
    handleCardClick,
    handlePopupConfirmDelete,
    handlePutCardLike);

  return card.generateCard();

}


const handleOpenPopupProfile = function () {

  popupProfileForm.open()
  popupProfileValid.cleanValid()

  popupProfileInputTypeName.value = userData.getUserInfo().name.textContent;
  popupProfileInputTypeJob.value = userData.getUserInfo().job.textContent;
}

let ownerId = null;

const userData = new UserInfo({
  name: profileUserName,
  job: profileUserJob,
  id: ownerId
})

// Наполняем DOM экземплярами класса Section
const listItems = new Section({

  renderer: (item) => {
    const cardElement = createCard(
      item,
      templateEl,
      userData.getUserInfo().id,
      () => {
        popupWithImg.open(item)
      },
      popupConfirmButton,
      api
    );
    listItems.addItem(cardElement)
  }
}, elementListContainerSelector)

const popupWithImg = new PopupWithImage(popupImg)

const popupProfileForm = new PopupWithForm({
  popupElement: popupProfile,
  handleFormSubmit: (formData) => {

    popupProfileForm.indicatLoading()
    api.patchSaveUserData(
        formData.popupProfileInputTypeName,
        formData.popupProfileInputTypeJob
      )
      .then(responseUserData => {

        userData.setUserInfo(
          responseUserData.name,
          responseUserData.about,
          responseUserData._id
        );
      })
      .catch(err => {
        console.log('Ошибка при отправке новых данных о пользователе')
      })
      .finally(() => {
        popupProfileForm.stopIndicatLoading()
        popupProfileForm.close();
        popupProfileValid.toggleButtonState()
      })
  }
})

const popupAddCardForm = new PopupWithForm({

  popupElement: popupNewPlace,
  handleFormSubmit: (formData) => {

    const name = formData.popupNewPlaceInputTypeName;
    const link = formData.popupNewPlaceInputTypeLink;

    popupAddCardForm.indicatLoading()

    api.postAddNewCard(name, link)
      .then(res => {
        const listItem = createCard(res,
          templateEl,
          userData.getUserInfo().id,
          () => {
            popupWithImg.open({
              name,
              link
            })
          },
          popupConfirmButton,
          api
        );

        elementListContainer.prepend(listItem);
      })
      .catch(err => {
        console.log('Ошибка при создании новой карточке на сервере')
      })
      .finally(() => {
        popupAddCardForm.stopIndicatLoading()
        popupAddCardForm.close();
        popupAddCardValid.toggleButtonState()
      })
  }
})

const popapChangeUserAvatar = new PopupWithForm({
  popupElement: popupChangeAvatar,
  handleFormSubmit: (formData) => {

    popapChangeUserAvatar.indicatLoading()
    api.patchUpdateUserAvatar(formData.popupChangeAvatarInputTypeLink)
      .then(responseUserAvatar => {
        profileAvatarImage.src = responseUserAvatar.avatar
      })
      .catch(err => {
        console.log('Ошибка при получении аватара с сервера')
      })
      .finally(() => {
        popapChangeUserAvatar.stopIndicatLoading()
        popapChangeUserAvatar.close()
        popupChangeAvatarValid.toggleButtonState()
      })

  }
})

const popupConfirmButton = new PopupWithConfirmButton({
  popupElement: popupConfirmDeleteCard,
  handleSubmitButton: (cardId) => {

    api.deleteCard(cardId)
    popupConfirmButton.close()

  }
})

// FormValidator
const popupProfileValid = new FormValidator(settingsValidation, popupProfileFormEL);
popupProfileValid.enableValidation();

const popupAddCardValid = new FormValidator(settingsValidation, popupNewPlaceForm);
popupAddCardValid.enableValidation();

const popupChangeAvatarValid = new FormValidator(settingsValidation, popupChangeAvatarForm);
popupChangeAvatarValid.enableValidation();

// addEventListener
popupProfileOpenBtn.addEventListener('click', handleOpenPopupProfile)
popupNewPlaceAddBtn.addEventListener('click', () => {
  popupAddCardForm.open()
  popupAddCardValid.cleanValid()
})
profileAvatarButton.addEventListener('click', () => {
  popapChangeUserAvatar.open()
})

// setEventListeners
popupProfileForm.setEventListeners()
popupAddCardForm.setEventListeners()
popapChangeUserAvatar.setEventListeners()
