import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [likes, setLikes] = React.useState(props.cardData.likes.length);
    const isOwn = props.cardData.owner === currentUser._id;
    const cardDeleteBtnClassName = isOwn ? 'card__delete-btn' : 'card__delete-btn card__delete-btn_hidden';
    const isLiked = props.cardData.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = isLiked ? 'card__like-btn card__like-btn_active' : 'card__like-btn';

    function handleClick() {
        props.onCardClick(props.cardData);
    }

    function handleLikeClick() {
        props.onCardLike(props.cardData, setLikes);
        setLikes('...');
    }

    function handleDeleteClick() {
        props.onCardDelete(props.cardData);
    }

    React.useEffect(() => {
        setLikes(props.cardData.likes.length);
    }, [props.cardData.likes.length]);

    return (
        <li className="card">
            <button onClick={handleDeleteClick} className={`button ${cardDeleteBtnClassName}`} type="button" aria-label="Удалить."></button>
            <img onClick={handleClick} className="card__img" src={props.cardData.link} alt={props.cardData.name} />
            <div className="card__description">
                <h2 className="card__title">{props.cardData.name}</h2>
                <div className="card__like">
                    <button onClick={handleLikeClick} className={`button ${cardLikeButtonClassName}`} type="button" aria-label="Нравится."></button>
                    <p className="card__likes">{likes}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;