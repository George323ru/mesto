export default class Card {
  constructor(data,
    cardSelector,
    handleCardClick) {

    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

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

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick()
    })

    this._element.querySelector('.element__buttonDelete').addEventListener('click', (event) => {
      this._handleDelBtn(event)
    })

    this._element.querySelector('.element__likeButton').addEventListener('click', (event) => {
      this._handleLikeBtn(event)
    })
  }

  _handleDelBtn(event) {

    // target - "цель"
    const targetDeleteEl = event.target;

    const targetItem = targetDeleteEl.closest('.element');
    targetItem.remove()
  }

  _handleLikeBtn(event) {

    // target - "цель"
    const targetBtnLikeEl = event.target;

    const targetItem = targetBtnLikeEl.classList.toggle('element__likeButton_active');
  }

  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;

  }
}
