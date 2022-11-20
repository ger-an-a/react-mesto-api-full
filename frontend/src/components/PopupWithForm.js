import React from 'react';
import Form from './Form';

function PopupWithForm(props) {
    return (
        <div onClick={props.onClose} className={`popup popup_target_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div onClick={(evt) => { evt.stopPropagation(); }} className="popup__container popup__container_contain_form">
                <button className="button button_target_close popup__close-btn" onClick={props.onClose} type="button" aria-label="Отмена."></button>
                <Form titleClass="form__title" btn={props.btn} btnClass={props.btnClass} btnStatus={props.btnStatus} children={props.children} title={props.title} onSubmit={props.onSubmit} name={props.name} />
            </div>
        </div>
    );
}

export default PopupWithForm;