import React from 'react';
import Mesto from './Mesto';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login'
import api from '../utils/Api';
import authentication from '../utils/Authentication';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { BrowserRouter, Route, useHistory, Redirect } from 'react-router-dom';
import union_error from '../images/union_error.png';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: 'Загрузка...', about: 'Загрузка...', avatar: '' });
  const [cardList, setCardList] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopup, setInfoPopup] = React.useState({ img: union_error, text: '' });
  const history = useHistory();
  const [userEmail, setUserEmail] = React.useState('');

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard({
      ...card,
      name: card.name,
      link: card.link,
      isOpen: true,
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api.patchInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.patchAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard({ title, sorce }) {
    api.postCard(title, sorce)
      .then((newCard) => {
        setCardList([newCard.data, ...cardList]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCardList((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    setIsDeletePopupOpen(true);
    setSelectedDeleteCard({
      ...card
    });
  }

  function deleteCard(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCardList((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function tokenCheck() {
    authentication.checkCookie()
      .then((res) => {
        if (res.data) {
          authentication.getInfo()
            .then((res) => {
              setUserEmail(res.data.email);
              setCurrentUser(res.data);
              setLoggedIn(true);
              history.push('/');
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSignOut() {
    authentication.postLogout()
      .then(() => {
        setLoggedIn(false);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getInitialInfo()])
        .then(([cardsData, userData]) => {
          setCurrentUser(userData.data);
          setCardList(cardsData.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else setCurrentUser({ name: 'Загрузка...', about: 'Загрузка...', avatar: '' });
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <BrowserRouter>
            <InfoTooltip img={infoPopup.img} text={infoPopup.text} isOpen={isInfoPopupOpen} onClose={closeAllPopups} />
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn} handleSignOut={handleSignOut}
              card={selectedCard} onClose={closeAllPopups}
              setLoggedIn={setLoggedIn} email={userEmail}
              selectedDeleteCard={selectedDeleteCard} onDeleteCard={deleteCard} isDeletePopupOpen={isDeletePopupOpen}
              cards={cardList} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onUpdateUser={handleUpdateUser} isEditProfilePopupOpen={isEditProfilePopupOpen}
              onAddCard={handleAddCard} isAddPlacePopupOpen={isAddPlacePopupOpen}
              onUpdateAvatar={handleUpdateAvatar} isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              component={Mesto}
            />
            <Route path="/sign-up">
              <Header />
              <Register setInfoPopup={setInfoPopup} openInfoPopup={setIsInfoPopupOpen} />
            </Route>
            <Route path="/sign-in">
              <Header />
              <Login setUserEmail={setUserEmail} setLoggedIn={setLoggedIn} setInfoPopup={setInfoPopup} openInfoPopup={setIsInfoPopupOpen} />
            </Route>
            <Route>
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </BrowserRouter>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
