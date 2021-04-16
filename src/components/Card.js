export default class Card {
  constructor(data,
    cardSelector,
    handleCardClick,
    handlePopupConfirmDelete,
    apiCard) {
    this._name = data.name;
    this._link = data.link;
    this._arrayLikeLength = data.likes.length;
    this._ownerId = data.owner._id;
    this._id = data._id;
    // console.log(this._id)
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handlePopupConfirmDelete = handlePopupConfirmDelete;
    this._apiCard = apiCard;
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

  _checkUserLike() {
    this._arrayLikes.forEach((like) => {
      if (like._id === this._ownerId) {
        this._likeButton.classList.add('element__likeButton_active');
      }
    })
  }

  _handleFindOwnerLike() {
    if (this._arrayLikes.find((item) =>
        item._id === this._ownerId)) {
      return true
    }
  }

  _handleLikeBtn(event) {
    this._numberLikes = Number(this._likeCount.textContent)
    this._containsLikeButtonActive = this._likeButton.classList.contains('element__likeButton_active')

    if ((this._handleFindOwnerLike() || this._containsLikeButtonActive) && this._containsLikeButtonActive) {

      this._apiCard.deleteLike(this._id)
      const targetRemoveItem = event.target.classList.remove('element__likeButton_active');
      this._likeCount.textContent = this._numberLikes - 1

    } else {

      this._apiCard.putLike(this._id)
      const targetItem = event.target.classList.add('element__likeButton_active');
      this._likeCount.textContent = this._numberLikes + 1

    }

  }

  _checkOwnerIdDeleteBasket() {
    if (this._ownerId !== '9b223845ed4c941af29c84c8') {
      this._buttonDeleteElement.remove()
    }
  }

  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._element.dataset.id = this._id
    this._likeButton = this._element.querySelector('.element__likeButton');
    this._likeCount = this._element.querySelector('.element__likeCount');
    this._likeCount.textContent = this._arrayLikeLength;

    this._checkOwnerIdDeleteBasket()
    this._checkUserLike()

    return this._element;

  }
}
