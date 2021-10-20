export default class Api{
  constructor(options){
    this._options = options;
  }
  getInitialCards(){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/cards', {
    headers: {
      authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getProfileInfo(){
    return fetch('https://nomoreparties.co/v1/cohort-29/users/me', {
      headers: {
        authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d'
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  setProfileInfo(data){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  setNewCard(data){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/cards', {
      method: 'POST',
      headers: {
        authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  deleteCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-29/cards/${cardId}`,{
      method: 'DELETE',
      headers: {
        authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d',
        'Content-Type': 'application/json'
      }
    })
  }
  setLike(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-29/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d'
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  deleteLIke(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-29/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  changeAvatar(data){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-29/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '0b6e9c86-816e-4cef-834f-31796e0eee5d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       avatar: data.avatar
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
