import React from "react";
import { useEffect } from "react";
import api from "../utils/Api.js";
import Card from "./Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [cards, setCards] = React.useState([]);
    const [userName, setUserName] = React.useState("");
    const [userDescription , setuserDescription ] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    
    // console.log(api);
    // api.getInitialCards().then(dataCards => console.log(dataCards));


    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
          .then(([user, card]) => {
            setUserName(user.name);
            setUserAvatar(user.avatar);
            setuserDescription (user.about);
            setCards(card);
          })
          .catch((err) => {
            console.log(err);
          });
        }, []);

  return (
    <main className="content">
        <section className="profile">
            <div className="profile__about-place">
                <div className="profile__avatar-place">
                  <img 
                    className="profile__avatar" 
                    src={userAvatar}
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
                        <h1 className="profile__name">{userName}</h1>
                        <button
                            type="button" 
                            className="profile__edit-button"
                            onClick={onEditProfile} 
                        />
                    </div>
                    <p className="profile__job">{userDescription}</p>
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
                    <Card 
                        key={card._id} 
                        card={card} 
                        onCardClick={onCardClick} 
                    />
                 ))}
            </ul>
        </section>
    </main>
  );
}

export default Main;
