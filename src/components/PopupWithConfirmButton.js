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

  open(cardId) {
    this._cardId = cardId
    super.open()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitButton(this._cardId)
    })
  }
}
