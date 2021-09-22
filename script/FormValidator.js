export default class FormValidator{
  constructor(config, formElement){
    this._config = config;
    this._formElement = formElement;
  }
  enableValidation(){
    this._setEventListeners();
  }
  resetValidation(){
    const inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._hideInputError(errorElement, inputElement);
      });
    this._toggleButtonState(inputList);
  }
  _setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
      this._toggleButtonState(inputList);
    });
  }
  _checkInputValidity(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid){
      this._showInputError(errorElement, inputElement);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }
  _showInputError(errorElement, inputElement){
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }
  _hideInputError(errorElement, inputElement){
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
  _toggleButtonState(inputList){
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    if(this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  }
  _hasInvalidInput(inputList){
    return inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
  });
}
  _disableSubmitButton(buttonElement){
    buttonElement.classList.add(this._config.inactiveButtonClass);
  }
  _enableSubmitButton(buttonElement){
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  }
}
