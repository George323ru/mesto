// Шесть карточек «из коробки», которые сразу добавляются на главную страницу
export const initialCards = [{
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

export const settingsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveBtn',
  inactiveButtonClass: 'popup__saveBtn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


export const popup = document.querySelectorAll('.popup')
const profileElement = document.querySelector('.profile')
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupProfileOpenBtn = profileElement.querySelector('.profile__editBtn');
export const popupProfileCloseBtn = popupProfile.querySelector('.popup__closeButton_type_profile');
export const profileUserAvatar = profileElement.querySelector('.profile__avatar');
export const profileUserName = profileElement.querySelector('.profile__userName');
export const profileUserJob = profileElement.querySelector('.profile__userJob');
export const popupProfileFormEL = popupProfile.querySelector('.popup__form_type_profile');
export const popupProfileInputTypeName = popupProfile.querySelector('.popup__input_type_profileName');
export const popupProfileInputTypeJob = popupProfile.querySelector('.popup__input_type_profileJob');
export const popupNewPlaceAddBtn = profileElement.querySelector('.profile__add-button');
export const popupNewPlace = document.querySelector('.popup_type_newPlace');
export const popupNewPlaceForm = popupNewPlace.querySelector('.popup__form_type_newPlace');
export const popupNewPlaceInputName = popupNewPlace.querySelector('.popup__input_type_newPlaceTypeName');
export const popupNewPlaceInputLink = popupNewPlace.querySelector('.popup__input_type_newPlaceTypeLink');
export const popupNewPlaceCloseBtn = popupNewPlace.querySelector('.popup__closeButton_type_newPlace');
export const submitBtn = popupNewPlaceForm.querySelector('.popup__saveBtn');
export const elementListContainer = document.querySelector('.elements__element-list');
export const elementListContainerSelector = '.elements__element-list';
export const elementsMsgNoElements = document.querySelector('.elements__msgNoElements');
export const templateEl = '.templateEl';
export const popupImg = document.querySelector('.popup_type_img');
export const escCode = 'Escape';
