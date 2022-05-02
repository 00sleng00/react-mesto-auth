import React from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);


    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard({});
    }


    const handleUpdateUser = (name, about) => {
        api.editProfile(name, about)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка ${err}`)
            );
    };

    const handleUpdateAvatar = (avatar) => {
        api.editAvatar(avatar)
            .then((item) => {
                setCurrentUser(item);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка ${err}`)
            );
    };

    const handleAddPlaceSubmit = (name, link) => {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка ${err}`)
            );
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        const changeLikeCardStatus = !isLiked
            ? api.addLike(card._id)
            : api.deleteLike(card._id);
        changeLikeCardStatus
            .then((newCard) => {
                setCards((item) =>
                    item.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(`Ошибка ${err}`));
    };


    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(`Ошибка ${err}`));
    };

    React.useEffect(() => {
        function handleUserInfo() {
            api.getProfile()
                .then((item) => {
                    setCurrentUser(item);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        handleUserInfo();
    }, []);

    React.useEffect(() => {
        function initialCards() {
            api.getInitialCards()
                .then((item) => {
                    setCards(item);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        initialCards();
    }, []);


    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div>
    );
}
export default App;