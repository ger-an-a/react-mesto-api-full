import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InputValidator } from '../utils/InputValidator';
import { FormValidator } from '../utils/FormValidator';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [about, setAbout] = React.useState(currentUser.about);
    const [btnText, setBtnText] = React.useState('Сохранить');
    const [inputClass, setInputClass] = React.useState('form__input');
    const [errorElementNameClass, setErrorElementNameClass] = React.useState('form__input-error');
    const [errorElementAboutClass, setErrorElementAboutClass] = React.useState('form__input-error');
    const [errMessageName, setErrMessageName] = React.useState('');
    const [errMessageAbout, setErrMessageAbout] = React.useState('');
    const [nameStatus, setNameStatus] = React.useState(true);
    const [aboutStatus, setAboutStatus] = React.useState(true);
    const [btnStatus, setBtnStatus] = React.useState(false);
    const [btnClass, setBtnClass] = React.useState('button form__submit form__submit_inactive');
    const inputNameValidation = new InputValidator(setInputClass, setErrorElementNameClass, setErrMessageName, setNameStatus);
    const inputAboutValidation = new InputValidator(setInputClass, setErrorElementAboutClass, setErrMessageAbout, setAboutStatus);
    const formValidator = new FormValidator([nameStatus, aboutStatus], setBtnStatus, setBtnClass);

    React.useEffect(() => {
        setBtnText('Сохранить');
        setName(currentUser.name);
        setAbout(currentUser.about);
        formValidator.disabledButtonState();
        inputNameValidation.hideInputError();
        inputAboutValidation.hideInputError();
    }, [currentUser, props.isEditProfilePopupOpen]);

    React.useEffect(() => {
        formValidator.isValid();
    }, [name, about]);

    function handleChangeName(e) {
        inputNameValidation.isValid(e);
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        inputAboutValidation.isValid(e);
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Сохранение...');
        props.onUpdateUser({
            name,
            about: about,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" btn={btnText} btnStatus={btnStatus} btnClass={btnClass} onClose={props.onClose} isOpen={props.isEditProfilePopupOpen} children={
            <>
                <input value={name} onChange={handleChangeName} className={inputClass} id="name-input" type="text" minLength="2" maxLength="40" name="userName"
                    placeholder="Имя пользователя" required />
                <span className={errorElementNameClass}>{errMessageName}</span>
                <input value={about} onChange={handleChangeAbout} className={inputClass} id="activity-input" type="text" minLength="2" maxLength="200" name="activity"
                    placeholder="Деятельность" required />
                <span className={errorElementAboutClass}>{errMessageAbout}</span>
            </>
        } />
    )
}

export default EditProfilePopup;