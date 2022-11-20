import PopupWithForm from "./PopupWithForm"
import React from "react";

function DeletePopup(props) {
    const [btnText, setBtnText] = React.useState('Да');

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Удаление...');
        props.onDeleteCard(props.selectedDeleteCard);
    }

    React.useEffect(() => {
        setBtnText('Да');
    }, [props.isDeletePopupOpen]);

    return (
        <PopupWithForm onSubmit={handleSubmit} name="delete" title="Вы уверены?" btn={btnText} btnStatus={false} btnClass='button form__submit form__submit_active' onClose={props.onClose} isOpen={props.isDeletePopupOpen} />
    )
}

export default DeletePopup