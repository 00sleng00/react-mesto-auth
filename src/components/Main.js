import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
   const currentUser = React.useContext(CurrentUserContext);

      return (
         <main className="content">
            <section className="profile">
               <div className="profile__icon" type="button" onClick={onEditAvatar}>
                  <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar" />
               </div>
               <div className="profile__info">
                  <h1 className="profile__info-name">{currentUser.name}</h1>
                  <p className="profile__info-job">{currentUser.about}</p>
                  <button onClick={onEditProfile} type="button" className="profile__info-edit-button"></button>
               </div>
               <button onClick={onAddPlace} type="button" className="profile__info-add-button"></button>
            </section>

            <section className="card">
               <ul className="card__list">
                  {cards.map((card) => (
                     <Card key={card._id}
                           card={card}
                           onCardClick={onCardClick}
                           onCardLike={onCardLike}
                           onCardDelete={onCardDelete}
                     />
                  ))}
               </ul>
            </section>
         </main>
      );

   }

   export default Main;