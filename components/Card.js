import {
  handleMsgNoElements
} from '../pages/index.js'


export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
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
    // Выбираем кнопку через специальное свойство target
    const targetDeleteEl = event.target;
    // Выбираем родительский элемент, в котором будет удаляться дочерний элемент
    const targetItem = targetDeleteEl.closest('.element');
    targetItem.remove() // Функция удаления элемента
    // Добавляем надпись "Нет элементов", если все карточки были удалены
    handleMsgNoElements()
  }

  _handleLikeBtn(event) {
    // Получаем кнопку, как элемент цель
    const targetBtnLikeEl = event.target;
    // Добавляем переключатель класса
    const targetItem = targetBtnLikeEl.classList.toggle('element__likeButton_active');
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    // Вернём элемент наружу
    return this._element;
  }
}
