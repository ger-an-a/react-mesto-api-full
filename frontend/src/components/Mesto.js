import EditProfilePopup from './EditProfilePopup';
import Header from './Header';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import ImagePopup from './ImagePopup';
import Main from './Main';
import Footer from './Footer';
import React from "react";

function Mesto(props) {
    return (
        <>
            <Header handleSignOut={props.handleSignOut} setLoggedIn={props.setLoggedIn} email={props.email} />
            <Main cards={props.cards} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} onEditAvatar={props.onEditAvatar} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace} />
            <Footer />
            <EditProfilePopup onUpdateUser={props.onUpdateUser} isEditProfilePopupOpen={props.isEditProfilePopupOpen} onClose={props.onClose} />
            <EditAvatarPopup onUpdateAvatar={props.onUpdateAvatar} isEditAvatarPopupOpen={props.isEditAvatarPopupOpen} onClose={props.onClose} />
            <AddPlacePopup onAddCard={props.onAddCard} isAddPlacePopupOpen={props.isAddPlacePopupOpen} onClose={props.onClose} />
            <DeletePopup selectedDeleteCard={props.selectedDeleteCard} onDeleteCard={props.onDeleteCard} onClose={props.onClose} isDeletePopupOpen={props.isDeletePopupOpen} />
            <ImagePopup card={props.card} onClose={props.onClose} />
        </>
    )
}

export default Mesto