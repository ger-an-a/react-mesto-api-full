export class FormValidator {
    constructor(inputsStatus = [], setBtnStatus, setBtnClass, btnTypeClass = '') {
        this._inputsStatus = inputsStatus;
        this._setBtnStatus = setBtnStatus;
        this._setBtnClass = setBtnClass;
        this._btnTypeClass = btnTypeClass;
    }

    disabledButtonState() {
        this._setBtnStatus(true);
        this._setBtnClass(this._btnTypeClass + ' button form__submit form__submit_inactive');
    }

    _activeButtonState() {
        this._setBtnStatus(false);
        this._setBtnClass(this._btnTypeClass + ' button form__submit ');
    }

    isValid() {
        if (this._inputsStatus.includes(false)) {
            this.disabledButtonState();
        } else {
            this._activeButtonState()
        }
    };
}

