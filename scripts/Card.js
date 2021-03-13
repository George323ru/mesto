export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(name, link) {
    // text и image — приватные поля,
    // они нужны только внутри класса
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    const newItems = templateEl.content.cloneNode(true);

    // вернём DOM-элемент карточки
    return newItems;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    // Вернём элемент наружу
    return this._element;
  }
}
