export default class FormValidator {
  constructor(config, formElement){
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }
  enableValidation(){
    this._setEventListeners();
  }
  resetValidation(){
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        this._hideInputError(errorElement, inputElement);
      });
    this._toggleButtonState();
  }
  _setEventListeners(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      this._toggleButtonState();
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
  _toggleButtonState(){
    if(this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  _hasInvalidInput(){
    return this._inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
  });
}
  _disableSubmitButton(){
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }
  _enableSubmitButton(){
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
  }
}
