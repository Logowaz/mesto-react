import { useState } from 'react'
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setisConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);


  function handleEditProfilePopup () {
    setIsEditProfilePopupOpen (true);
  }
  
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisConfirmDeletePopupOpen(false);

    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <>
      <Header />
      <Main 
      onEditProfile={handleEditProfilePopup}
      onAddPlace={handleAddPlacePopupOpen}
      onEditAvatar={handleEditAvatarPopupOpen}
      onCardClick={handleCardClick}
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

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
      >
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups} 
      />
  </>
  )
}

export default App
