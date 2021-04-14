export default class Card {
  constructor(data,
    cardSelector,
    handleCardClick,
    handlePopupConfirmDelete,
    handlePutCardLike) {
    this._name = data.name;
    this._link = data.link;
    this._arrayLikeLength = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handlePopupConfirmDelete = handlePopupConfirmDelete;
    this._putCardLike = handlePutCardLike;
    this._arrayLikes = data.likes;
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
    this._handlePopupConfirmDelete.open()
    this._handlePopupConfirmDelete.setEventListeners(event, this._id)

  }

  _handleFindOwnerLike() {
    if (this._arrayLikes.find((item) =>
        item._id === '9b223845ed4c941af29c84c8')) {
      return true
    }

  }

  _handleLikeBtn(event) {
    console.log()
    if ((this._handleFindOwnerLike() || this._element.querySelector('.element__likeButton').classList.contains('element__likeButton_active')) && this._element.querySelector('.element__likeButton').classList.contains('element__likeButton_active')) {
      console.log('делете')
      this._putCardLike.deleteLike(this._id)
      const targetRemoveItem = event.target.classList.remove('element__likeButton_active');
    } else {
      console.log('пут')
      this._putCardLike.putLike(this._id)
      const targetItem = event.target.classList.add('element__likeButton_active');
    }
    // // Number(this._likeCount.textContent) + 1;

  }

  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._likeCount = this._element.querySelector('.element__likeCount');
    this._likeCount.textContent = this._arrayLikeLength;
    this._element.dataset.id = this._id

    if (this._ownerId !== '9b223845ed4c941af29c84c8') {
      this._buttonDeleteElement.remove()
    }

    if (this._handleFindOwnerLike()) {
      this._element.querySelector('.element__likeButton').classList.add('element__likeButton_active');
    }

    return this._element;

  }
}
