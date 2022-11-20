function ImagePopup(props) {
    return (
        <div className={`popup popup_target_img ${props.card.isOpen && "popup_opened"}`} onClick={props.onClose}>
            <div className="popup__container" onClick={(evt) => { evt.stopPropagation(); }}>
                <button className="button button_target_close popup__close-btn" onClick={props.onClose} type="button" aria-label="Отмена."></button>
                <div className="photo-viewport">
                    <img className="photo-viewport__img" src={props.card.link} alt={props.card.name} />
                    <h2 className="photo-viewport__title">{props.card.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;