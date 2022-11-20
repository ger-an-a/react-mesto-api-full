function InfoTooltip(props) {
    return (
        <div onClick={props.onClose} className={`popup popup_target_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div onClick={(evt) => { evt.stopPropagation(); }} className="popup__container popup__container_contain_form">
                <button className="button button_target_close popup__close-btn" onClick={props.onClose} type="button" aria-label="Отмена."></button>
                <img className="popup__union" src={props.img} alt="Значок" />
                <h2 className="popup__title">{props.text}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;