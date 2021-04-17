export const settingsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveBtn',
  inactiveButtonClass: 'popup__saveBtn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const popup = document.querySelectorAll('.popup')

const profileElement = document.querySelector('.profile')
export const popupProfile = '.popup_type_profile';
export const popupProfileOpenBtn = profileElement.querySelector('.profile__editBtn');
export const popupProfileCloseBtn = document.querySelector('.popup__closeButton_type_profile');
export const profileUserAvatar = profileElement.querySelector('.profile__avatar');
export const profileUserName = '.profile__userName';
export const profileUserJob = '.profile__userJob';
export const profileAvatarImage = '.profile__avatar';
export const profileAvatarButton = profileElement.querySelector('.profile__editAvatarButton')

export const popupProfileFormEL = document.querySelector('.popup__form_type_profile');
export const popupProfileInputTypeName = document.querySelector('.popup__input_type_profileName');
export const popupProfileInputTypeJob = document.querySelector('.popup__input_type_profileJob');

export const popupNewPlaceAddBtn = profileElement.querySelector('.profile__add-button');
export const popupNewPlace = '.popup_type_newPlace';
export const popupNewPlaceForm = document.querySelector('.popup__form_type_newPlace');
export const popupNewPlaceInputName = document.querySelector('.popup__input_type_newPlaceTypeName');
export const popupNewPlaceInputLink = document.querySelector('.popup__input_type_newPlaceTypeLink');
export const popupNewPlaceCloseBtn = document.querySelector('.popup__closeButton_type_newPlace');

export const popupImg = '.popup_type_img';

export const popupConfirmDeleteCard = '.popup_type_confirmDeleteCard';

export const popupChangeAvatar = '.popup_type_changeAvatar';
export const popupChangeAvatarForm = document.querySelector('.popup__form_type_changeAvatar');
export const popupChangeAvatarInputLink = document.querySelector('.popup__input_type_changeAvatarTypeLink');
export const popupChangeAvatarCloseBtn = document.querySelector('.popup__closeButton_type_changeAvatar');

export const submitBtn = popupNewPlaceForm.querySelector('.popup__saveBtn');
export const elementListContainer = document.querySelector('.elements__element-list');
export const elementListContainerSelector = '.elements__element-list';

export const templateEl = '.templateEl';

export const escCode = 'Escape';
