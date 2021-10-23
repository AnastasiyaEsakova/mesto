export default class UserInfo{
  constructor({nameElement, jobElement, avatarElement}){
    this._name = nameElement;
    this._about = jobElement;
    this._avatar = avatarElement;
  }
/**возвращает объект с данными пользователя*/
  getUserInfo(){
    this._items = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
    return this._items;
  }
  /**принимает новые данные пользователя и добавляет их на страницу*/
  setUserInfo(config){
    this._name.textContent = config.name;
    this._about.textContent = config.about;
    this._avatar.src = config.avatar;
  }
}
