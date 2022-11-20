import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <button className="profile__avatar-btn" onClick={props.onEditAvatar} type="button" aria-label=""></button>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля." />
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button className="button profile__edit-btn" onClick={props.onEditProfile} type="button" aria-label="Редактировать."></button>
                </div>
                <button className="button profile__add-btn" onClick={props.onAddPlace} type="button" aria-label="Добавить."></button>
            </section>
            <section className="cards">
                <ul className="cards__grid">
                    {
                        props.cards.map((item) => {
                            return (
                                <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={item._id} cardData={item} onCardClick={props.onCardClick} />
                            )
                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;


