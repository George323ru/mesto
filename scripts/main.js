const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');

let userName = document.querySelector('.profile__user-name');
let userSpec = document.querySelector('.profile__user-specialization');
let inputName = popup.querySelector('.popup__input-name');
let inputSpec = popup.querySelector('.popup__input-specialization');

const popupToggle = function (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_open');
  inputName.value = userName.textContent;
  inputSpec.value = userSpec.textContent;


}


const popupSave = function () {
  // evt.preventDefault();
  popup.classList.toggle('popup_open');

  userName.textContent = ` ${inputName.value} `;
  userSpec.textContent = ` ${inputSpec.value} `;

}
// userName.insertAdjacentText('afterbegin', `
// ${inputName.value}
// `);


popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupSaveButton.addEventListener('click', popupSave);

// console.log(inputName)
