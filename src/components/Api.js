export default class Api{
  constructor(options){
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
    this._handleReturnPromise = ((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
    });
  }
  /**Cards */
  getInitialCards(){
    return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
  })
    .then((res) => this._handleReturnPromise(res));
  }
  setNewCard(data, button){
    this.renderLoading(true, button);
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => this._handleReturnPromise(res))
    .finally(() =>{
      this.renderLoading(false, button);
    });
  }
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this._headers
    })
  }

  /**likes */
  setLike(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => this._handleReturnPromise(res));
  }
  deleteLIke(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._handleReturnPromise(res));
  }

  //**Profile */
  getProfileInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => this._handleReturnPromise(res));
  }

  setProfileInfo(data, button){
    this.renderLoading(true, button);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._handleReturnPromise(res))
    .finally(() =>{
      this.renderLoading(false, button);
    });
  }

  /**Avatar */
  changeAvatar(data, button){
    this.renderLoading(true, button);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
       avatar: data.avatar
      })
    })
    .then((res) => this._handleReturnPromise(res))
    .finally(() =>{
      this.renderLoading(false);
    });
  }

  renderLoading(isLoading,button){
    this._buttonElement = button;
    if(isLoading){
      this._buttonElement.textContent = 'Сохранение...';
    } else {
      this._buttonElement.textContent = this._buttonElement.value;
    }
    this._buttonElement = '';
  }
}
