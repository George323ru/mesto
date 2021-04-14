import Popup from "./Popup.js";

export default class PopupWithConfirmButton extends Popup {
  constructor({
    popupElement,
    handleSubmitButton
  }) {
    super(popupElement);

    this._form = this._popupElement.querySelector(".popup__form");

    this._handleSubmitButton = handleSubmitButton;
    super.open()
    super.close()
    super.setEventListeners()
  }



  setEventListeners(event) {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitButton()
      event.target.closest('.element').remove();
    })
  }
}
