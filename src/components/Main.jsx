import React from "react";
import { useEffect, useContext} from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile, 
  onAddPlace, 
  onEditAvatar, 
  onCardClick, 
  onCardLike,
  onCardDelete,
  cards
  }) {

  const currentUser = useContext(CurrentUserContext);

  // console.log(currentUser);

  return (
    <main className="content">
        <section className="profile">
            <div className="profile__about-place">
                <div className="profile__avatar-place">
                  <img 
                    className="profile__avatar" 
                    src={currentUser.avatar}
                    alt="аватар пользователя"
                  />
                  <button
                    type="submit" 
                    className="profile__button-avatar"
                    onClick={onEditAvatar}
                  />
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            type="button" 
                            className="profile__edit-button"
                            onClick={onEditProfile} 
                        />
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
            </div>
            <button 
                type="button" 
                className="profile__add-button"
                onClick={onAddPlace}
            />
        </section>
        <section className="elements">
            <ul className="elements__cards">
                {cards.map((card) => (
                    <li key={card._id}>
                        <Card 
                            card={card} 
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    </li>
                 ))}
            </ul>
        </section>
    </main>
  );
}

export default Main;
