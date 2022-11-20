import PopupWithForm from './PopupWithForm';
import React from 'react';
import { InputValidator } from '../utils/InputValidator';
import { FormValidator } from '../utils/FormValidator';

function EditAvatarPopup(props) {
    const inputRef = React.useRef();
    const [btnText, setBtnText] = React.useState('Сохранить');
    const [inputClass, setInputClass] = React.useState('form__input');
    const [errorElementClass, setErrorElementClass] = React.useState('form__input-error');
    const [errMessage, setErrMessage] = React.useState('');
    const [btnStatus, setBtnStatus] = React.useState(false);
    const [btnClass, setBtnClass] = React.useState('button form__submit form__submit_inactive');
    const [inputStatus, setInputStatus] = React.useState(false);
    const inputAvatarValidation = new InputValidator(setInputClass, setErrorElementClass, setErrMessage, setInputStatus);
    const formValidator = new FormValidator([inputStatus], setBtnStatus, setBtnClass);

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Сохранение...');
        props.onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    function handleChange(e) {
        inputAvatarValidation.isValid(e);
    }

    React.useEffect(() => {
        formValidator.isValid();
    }, [inputStatus]);

    React.useEffect(() => {
        formValidator.disabledButtonState();
        inputAvatarValidation.hideInputError();
        setBtnText('Сохранить');
        inputRef.current.value = '';
    }, [props.isEditAvatarPopupOpen]);

    return (
        <PopupWithForm btnStatus={btnStatus} btnClass={btnClass} onSubmit={handleSubmit} name="avatar" title="Обновить аватар" btn={btnText} onClose={props.onClose} isOpen={props.isEditAvatarPopupOpen} children={
            <>
                <input onChange={handleChange} ref={inputRef} className={inputClass} id="avatar-input" type="url" name="sorce" placeholder="Ссылка на картинку"
                    required />
                <span className={errorElementClass}>{errMessage}</span>
            </>
        } />
    )

}

export default EditAvatarPopup;