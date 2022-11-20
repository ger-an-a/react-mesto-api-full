export class InputValidator {
  constructor(setInputClass, setErrorElementClass, setErrMessage, setInputStatus, inputTypeClass = '') {
    this._setInputClass = setInputClass;
    this._setErrorElementClass = setErrorElementClass;
    this._setErrMessage = setErrMessage;
    this._setInputStatus = setInputStatus;
    this._inputTypeClass = inputTypeClass;
  }

  _showInputError(errorMessage) {
    this._setInputClass('form__input form__input_type_error ' + this._inputTypeClass);
    this._setErrorElementClass('form__input-error');
    this._setErrMessage(errorMessage);
  };

  hideInputError() {
    this._setInputClass('form__input ' + this._inputTypeClass);
    this._setErrorElementClass('');
    this._setErrMessage('');
  };

  isValid(e) {
    if (!e.target.validity.valid) {
      this._showInputError(e.target.validationMessage);
      this._setInputStatus(false);
    } else {
      this.hideInputError();
      this._setInputStatus(true);
    }
  };
}

