import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
    const cardNameRef = useRef();
    const cardLinkRef = useRef();

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        onUpdateCards({
            name: cardNameRef.current.value,
            link: cardLinkRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="addcard"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
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
                ref={cardNameRef}
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
                ref={cardLinkRef}
            />

            <span 
                id="input-link-error" 
                className="popup__error">
            </span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;