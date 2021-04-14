export default class Card {
  constructor(data,
    cardSelector,
    handleCardClick,
    handleOpenPopupConfirmDelete) {
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleOpenPopupConfirmDelete = handleOpenPopupConfirmDelete;
  }

  _getTemplate() {

    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {

    this._imgElement = this._element.querySelector('.element__image')
    this._imgElement.addEventListener('click', () => {
      this._handleCardClick()
    })

    this._buttonDeleteElement = this._element.querySelector('.element__buttonDelete')
    this._buttonDeleteElement.addEventListener('click', (event) => {
      this._handlePopupConfirmOpen(event);
    })

    this._element.querySelector('.element__likeButton').addEventListener('click', (event) => {
      this._handleLikeBtn(event)
    })

  }

  _handlePopupConfirmOpen(event) {
    this._handleOpenPopupConfirmDelete.open()
    this._handleOpenPopupConfirmDelete.setEventListeners(event)
  }


  _handleLikeBtn(event) {

    const targetItem = event.target.classList.toggle('element__likeButton_active');
  }

  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._element.querySelector('.element__likeCount').textContent = this._like;
    this._element.dataset.id = this._id

    if (this._ownerId !== '9b223845ed4c941af29c84c8') {
      this._buttonDeleteElement.remove()
    }

    return this._element;

  }
}
