export default class Section {
  constructor({
    data,
    renderer
  }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Вставляем в разметку
  addItem(element) {
    this._container.append(element);
  }

  // Отрисовываем массив с данными на странице
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

}
