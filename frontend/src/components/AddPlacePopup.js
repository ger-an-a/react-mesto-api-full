import React from "react";
import PopupWithForm from "./PopupWithForm";
import { InputValidator } from '../utils/InputValidator';
import { FormValidator } from '../utils/FormValidator';

function AddPlacePopup(props) {
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [btnText, setBtnText] = React.useState('Создать');
    const [inputClass, setInputClass] = React.useState('form__input');
    const [errorElementTitleClass, setErrorElementTitleClass] = React.useState('form__input-error');
    const [errorElementUrlClass, setErrorElementUrlClass] = React.useState('form__input-error');
    const [errMessageTitle, setErrMessageTitle] = React.useState('');
    const [errMessageUrl, setErrMessageUrl] = React.useState('');
    const [titleStatus, setTitleStatus] = React.useState(false);
    const [urlStatus, setUrlStatus] = React.useState(false);
    const [btnStatus, setBtnStatus] = React.useState(false);
    const [btnClass, setBtnClass] = React.useState('button form__submit form__submit_inactive');
    const inputTitleValidation = new InputValidator(setInputClass, setErrorElementTitleClass, setErrMessageTitle, setTitleStatus);
    const inputUrlValidation = new InputValidator(setInputClass, setErrorElementUrlClass, setErrMessageUrl, setUrlStatus);
    const formValidator = new FormValidator([titleStatus, urlStatus], setBtnStatus, setBtnClass);

    React.useEffect(() => {
        setBtnText('Создать');
        setTitle('');
        setUrl('');
        formValidator.disabledButtonState();
        inputTitleValidation.hideInputError();
        inputUrlValidation.hideInputError();
    }, [props.isAddPlacePopupOpen]);

    React.useEffect(() => {
        formValidator.isValid();
    }, [title, url]);

    function handleChangeTitle(e) {
        inputTitleValidation.isValid(e);
        setTitle(e.target.value);
    }

    function handleChangeUrl(e) {
        inputUrlValidation.isValid(e);
        setUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Сохранение...');
        props.onAddCard({
            title,
            sorce: url,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="add" title="Новое место" btn={btnText} btnStatus={btnStatus} btnClass={btnClass} onClose={props.onClose} isOpen={props.isAddPlacePopupOpen} children={
            <>
                <input value={title} onChange={handleChangeTitle} className={inputClass} id="title-input" minLength="2" maxLength="30" type="text" name="title"
                    placeholder="Название" required />
                <span className={errorElementTitleClass}>{errMessageTitle}</span>
                <input value={url} onChange={handleChangeUrl} className={inputClass} id="sorce-input" type="url" name="sorce" placeholder="Ссылка на картинку" required />
                <span className={errorElementUrlClass}>{errMessageUrl}</span>
            </>
        } />
    )
}

export default AddPlacePopup;