export default class Section{
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItem(items){
    this.clear();
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element){
    this._container.append(element);
  }
  addNewItem(element){
    this._container.prepend(element);
  }
  clear() {
    this._container.innerHTML = '';
  }
}
