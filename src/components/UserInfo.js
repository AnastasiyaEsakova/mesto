export default class UserInfo{
  constructor({nameSelector, jobSelector}){
    this._name = nameSelector;
    this._job = jobSelector;
    this._inputName = document.querySelector('.popup__input_el_name');
    this._inputJob = document.querySelector('.popup__input_el_job');
  }

  setUserInfo(config){
    this._name.textContent = config.name;
    this._job.textContent = config.job;
    // принимает новые данные пользователя и добавляет на страницу
  }
  getUserInfo(){
    this._inputName.value = this._name.textContent;
    this._inputJob.value = this._job.textContent;
    // получает данные со страницы в переносит в инпут
  }
}
