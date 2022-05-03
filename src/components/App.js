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

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";
import InfoTooltip from "./InfoTooltip";



const App = () => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isTooltipPopupOpen, setTooltipPopup] = React.useState(false);
    const [onInfoTooltip, setOnInfoTooltip] = React.useState({});
    const [isLogin, setIsLogin] = React.useState(false);
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    const history = useHistory();

    const signOut = () => {
        removeToken();
        setData({
            email: "",
            password: "",
        });
        setIsLogin(false);
        history.push("/sign-in");
    };

    const handleRegister = (email, password) => {
        auth.register(email, password)
            .then(() => {
                setTooltipPopup(true);
                setOnInfoTooltip(true);
                history.push("/sign-in");
            })
            .catch((res) => {
                console.log(res);
                setTooltipPopup(true);
                setOnInfoTooltip(false);
            });
    };

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then((data) => {
                setToken(data.token);
                setData({
                    email: data.email,
                });
                setIsLogin(true);
                history.replace({ pathname: "/" });
            })
            .catch((res) => {
                console.log(res);
                setTooltipPopup(true);
                setOnInfoTooltip(false);
            });
    };

    React.useEffect(() => {
        const tokenCheck = () => {
            const jwt = getToken();
            if (jwt) {
                auth.getContent(jwt)
                    .then((res) => {
                        if (res && res.data.email) {
                            setData({
                                email: res.data.email,
                            });
                            setIsLogin(true);
                            history.push("/");
                        } else {
                            history.push("/sign-in");
                        }
                    })
                    .catch((err) => console.error(err));
            }
        };
        tokenCheck();
    }, [history, isLogin]);



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
        setTooltipPopup(false);
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
        isLogin && handleUserInfo();
    }, [isLogin]);

    React.useEffect(() => {
        function initialCards() {
            api.getInitialCards()
                .then((item) => {
                    setCards(item);
                })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
        isLogin && initialCards();
    }, [isLogin]);


    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    signOut={signOut}
                    loggedIn={isLogin}
                    email={data.email}
                />

                <Switch>
                    <ProtectedRoute
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}

                        component={Main}
                        loggedIn={isLogin}
                        exact
                        path="/"
                    />
                    <Route path="/sign-in">
                        <Login handleLogin={handleLogin} />
                    </Route>

                    <Route path="/sign-up">
                        <Register handleRegister={handleRegister} />
                    </Route>

                    <Route>
                        {isLogin ? (
                            <Redirect to="/" />
                        ) : (
                            <Redirect to="/sign-in" />
                        )}
                    </Route>
                </Switch>

                {isLogin && <Footer />}

                <InfoTooltip
                    isOpen={isTooltipPopupOpen}
                    onClose={closeAllPopups}
                    onInfoTooltip={onInfoTooltip}
                />

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
};
export default App;