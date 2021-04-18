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
  elementListContainerSelector,
  templateEl,
  popupImg,
  settingsValidation
} from '../utils/constants.js';
import '../pages/index.css';

let ownerId = undefined;
let userCardElement = undefined;

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: '59e52716-d825-43a0-9822-26cced8398ed'
})

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    userData.setUserInfo({
      name: userInfo.name,
      job: userInfo.about,
      avatar: userInfo.avatar,
      id: userInfo._id
    })
    listItems.renderItems(cards);
  })
  .catch(err => console.log('Ошибка при получении данных с сервера'));

const popupConfirmButton = new PopupWithConfirmButton({
  popupElement: popupConfirmDeleteCard,
  handleSubmitButton: (cardId) => {

    api.deleteCard(cardId)
      .then(() => {
        userCardElement.removeCard()
        userCardElement = undefined;
        popupConfirmButton.close()
      })
      .catch((err) => {
        console.log('Ошибка при удалении карточки на сервере')
      })
  }
})

function createCard(item, templateSelector, anyOwnerId) {

  const card = new Card(item, templateSelector, anyOwnerId, {
    handleCardClick: () => {
      popupWithImg.open(item)
    },
    handlePopupConfirmDelete: () => {
      userCardElement = card;
      popupConfirmButton.open(item._id)
    },
    handlePutLike: () => {
      api.putLike(item._id)
        .then((responseData) => {
          card.setUserLike(responseData)
        })
    },
    handleDeleteLike: () => {
      api.deleteLike(item._id)
        .then((responseData) => {
          card.deleteUserLike(responseData)
        })
    }
  });
  return card;
}

const handleOpenPopupProfile = function () {

  popupProfileForm.open()
  popupProfileValid.cleanValid()

  popupProfileInputTypeName.value = userData.getUserInfo().name
  popupProfileInputTypeJob.value = userData.getUserInfo().job
}

const userData = new UserInfo({
  name: profileUserName,
  job: profileUserJob,
  avatar: profileAvatarImage,
  id: ownerId
})

// Наполняем DOM экземплярами класса Section
const listItems = new Section({

  renderer: (item) => {
    const cardElement = createCard(
      item,
      templateEl,
      userData.getUserInfo().id
    );

    listItems.addItem(cardElement.generateCard())
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

        userData.setUserInfo({
          name: responseUserData.name,
          job: responseUserData.about,
          id: responseUserData._id,
          avatar: responseUserData.avatar
        })

        popupProfileForm.close()
      })
      .catch(err => {
        console.log('Ошибка при отправке новых данных о пользователе')
      })
      .finally(() => {
        popupProfileForm.stopIndicatLoading()
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
        const cardItem = createCard(res,
          templateEl,
          userData.getUserInfo().id
        );

        popupAddCardForm.close()
        listItems.addNewUserItem(cardItem.generateCard())
      })
      .catch(err => {
        console.log('Ошибка при создании новой карточке на сервере')
      })
      .finally(() => {
        popupAddCardForm.stopIndicatLoading()
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
        userData.setUserInfo({
          name: responseUserAvatar.name,
          job: responseUserAvatar.about,
          id: responseUserAvatar._id,
          avatar: responseUserAvatar.avatar
        })
        popapChangeUserAvatar.close()
      })
      .catch(err => {
        console.log('Ошибка при получении аватара с сервера')
      })
      .finally(() => {
        popapChangeUserAvatar.stopIndicatLoading()
        popupChangeAvatarValid.toggleButtonState()
      })

  }
})

// FormValidation
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
popupConfirmButton.setEventListeners()
popapChangeUserAvatar.setEventListeners()
