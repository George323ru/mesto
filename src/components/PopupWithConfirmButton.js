import Popup from "./Popup.js";

export default class PopupWithConfirmButton extends Popup {
  constructor({
    popupElement,
    handleSubmitButton
  }) {
    super(popupElement);

    this._form = this._popupElement.querySelector(".popup__form");

    this._handleSubmitButton = handleSubmitButton;
    super.close()
  }

  setEventListeners(event, cardId) {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitButton(cardId)
      event.target.closest('.element').remove();
    })
  }
}
