import { useState, useEffect } from 'react'
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import ConfirmDeletePopup from './ConfirmDeletePopup.jsx';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);
  


  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function handleEditProfilePopup () {
    setIsEditProfilePopupOpen (true);
  }
  
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmPopupOpen(card) {
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(isLiked);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      console.log(newCard);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete() {
    api.deleteCard(selectedCard._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== selectedCard._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
        onEditProfile={handleEditProfilePopup}
        onAddPlace={handleAddPlacePopupOpen}
        onEditAvatar={handleEditAvatarPopupOpen}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleConfirmPopupOpen}
        cards={cards}
        />
        <Footer />

        <PopupWithForm
          name="editprofile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
        
          <input 
            id="input-name"
            type="text" 
            placeholder="Имя" 
            name="name" 
            className="form__item form__item_type_name" 
            minLength={2} 
            maxLength={40}
            required
          />

          <span 
            id="input-name-error" 
            className="popup__error">
          </span>

          <input 
            id="input-job" 
            type="text" 
            placeholder="О себе" 
            name="job" 
            className="form__item form__item_type_job" 
            minLength={2} 
            maxLength={200}
            required
          />

          <span 
            id="input-job-error" 
            className="popup__error">
          </span>
        
        </PopupWithForm>

        <PopupWithForm
          name="addcard"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input 
            id="input-cardname" 
            type="text" 
            placeholder="Название" 
            name="name" 
            className="form__item form__item_type_place-name" 
            minLength={2}
            maxLength={30}
            required
          />

          <span 
            id="input-cardname-error" 
            className="popup__error">
          </span>

          <input 
            id="input-link" 
            type="url" 
            placeholder="Ссылка на картинку" 
            name="link" 
            className="form__item form__item_type_link" 
            required
          />

          <span 
            id="input-link-error" 
            className="popup__error"></span>

        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input 
            id="input-link-avatar" 
            type="url" 
            name="link" 
            placeholder="Ссылка на картинку" 
            className="form__item form__item_avatar_link" 
            required
          />

          <span 
            id="input-link-avatar-error" 
            className="popup__error">
          </span>

        </PopupWithForm>

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitConfirmDelete={handleCardDelete}
        >
        </ConfirmDeletePopup>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} 
        />
      </CurrentUserContext.Provider>
  </>
  )
}

export default App
