export default class Card {
  constructor(data,
    cardSelector,
    anyOwnerId, {
      handleCardClick,
      handlePopupConfirmDelete,
      handlePutLike,
      handleDeleteLike
    }
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._userId = anyOwnerId
    this._handleCardClick = handleCardClick;
    this._handlePopupConfirmDelete = handlePopupConfirmDelete;
    this._putLike = handlePutLike;
    this._deleteLike = handleDeleteLike;
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
    this._buttonDeleteElement.addEventListener('click', () => {

      this._handlePopupConfirmDelete()
    })

    this._likeButton = this._element.querySelector('.element__likeButton')
    this._likeButton.addEventListener('click', (event) => {
      if (event.target.classList.contains('element__likeButton_active')) {
        this._deleteLike()
      } else {
        this._putLike()
      }
    })
  }

  removeCard() {
    this._element.closest('.element').remove()
  }

  setUserLike(responseData) {
    this._likeButton.classList.add('element__likeButton_active');
    this._likeCount.textContent = responseData.likes.length
  }

  deleteUserLike(responseData) {
    this._likeButton.classList.remove('element__likeButton_active');
    this._likeCount.textContent = responseData.likes.length
  }

  _checkUserLike() {
    this._arrayLikes.forEach((like) => {

      if (like._id === this._userId) {
        this._likeButton.classList.add('element__likeButton_active');
      }
    })
  }

  _handleFindOwnerLike() {
    if (this._arrayLikes.find((item) =>
        item._id === this._data.owner._id)) {
      return true
    }
  }

  _checkOwnerIdDeleteBasket() {
    if (this._data.owner._id !== this._userId) {
      this._buttonDeleteElement.remove()
    }
  }

  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._data.name;
    this._imgElement.src = this._data.link;
    this._imgElement.alt = this._data.name;
    this._likeButton = this._element.querySelector('.element__likeButton');
    this._likeCount = this._element.querySelector('.element__likeCount');
    this._likeCount.textContent = this._data.likes.length;

    this._checkOwnerIdDeleteBasket()
    this._checkUserLike()

    return this._element;

  }
}
