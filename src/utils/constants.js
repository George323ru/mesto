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
export const profileAvatarImage = profileElement.querySelector('.profile__avatar')
export const profileAvatarButton = profileElement.querySelector('.profile__editAvatarButton')

export const popupProfileFormEL = popupProfile.querySelector('.popup__form_type_profile');
export const popupProfileInputTypeName = popupProfile.querySelector('.popup__input_type_profileName');
export const popupProfileInputTypeJob = popupProfile.querySelector('.popup__input_type_profileJob');

export const popupNewPlaceAddBtn = profileElement.querySelector('.profile__add-button');
export const popupNewPlace = document.querySelector('.popup_type_newPlace');
export const popupNewPlaceForm = popupNewPlace.querySelector('.popup__form_type_newPlace');
export const popupNewPlaceInputName = popupNewPlace.querySelector('.popup__input_type_newPlaceTypeName');
export const popupNewPlaceInputLink = popupNewPlace.querySelector('.popup__input_type_newPlaceTypeLink');
export const popupNewPlaceCloseBtn = popupNewPlace.querySelector('.popup__closeButton_type_newPlace');

export const popupConfirmDeleteCard = document.querySelector('.popup_type_confirmDeleteCard');

export const popupChangeAvatar = document.querySelector('.popup_type_changeAvatar');
export const popupChangeAvatarForm = popupChangeAvatar.querySelector('.popup__form_type_changeAvatar');
export const popupChangeAvatarInputLink = popupChangeAvatar.querySelector('.popup__input_type_changeAvatarTypeLink');
export const popupChangeAvatarCloseBtn = popupChangeAvatar.querySelector('.popup__closeButton_type_changeAvatar');

export const submitBtn = popupNewPlaceForm.querySelector('.popup__saveBtn');
export const elementListContainer = document.querySelector('.elements__element-list');
export const elementListContainerSelector = '.elements__element-list';

export const templateEl = '.templateEl';
export const popupImg = document.querySelector('.popup_type_img');
export const escCode = 'Escape';
