import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import {
  initialCards,
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


const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: '59e52716-d825-43a0-9822-26cced8398ed'
})

api.getCards()
  .then(cards => {
    listItems.renderItems(cards)
  })
  .catch(err => {
    console.log(err)
  })

api.getUserInfo()
  .then(info => {
    console.log(info.name)
    profileUserName.textContent = info.name;
    profileUserJob.textContent = info.about;
  })
  .catch(err => {
    console.log(err)
  })



function createCard(item, templateSelector, handleCardClick) {

  const card = new Card(item, templateSelector, handleCardClick);
  return card.generateCard();

}

const popupWithImg = new PopupWithImage(popupImg)

// Наполняем DOM экземплярами класса Section
const listItems = new Section({

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


    api.patchSaveUserData(formData.popupProfileInputTypeName, formData.popupProfileInputTypeJob)
      .then(userData => {
        console.log(userData)
      })
      .catch(err => {
        console.log(err)
      })
    // // При сабмите мы вставляем данные пользователя обратно в форму
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

    api.postAddNewCard(name, link)
      .catch(err => {
        console.log(err)
      })

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


// fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: '59e52716-d825-43a0-9822-26cced8398ed',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: userData.getUserInfo().name.textContent,
//     about: userData.getUserInfo().job.textContent
//   })
// });

// fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
//   method: 'POST',
//   headers: {
//     authorization: '59e52716-d825-43a0-9822-26cced8398ed',
//     'Content-Type': 'application/json; charset=UTF-8'
//   },
//   body: JSON.stringify({
//     name: 'Сургут',
//     link: 'https://barcaffe.ru/wp-content/uploads/2020/07/28_surgut2020.jpg'
//   })
// })
