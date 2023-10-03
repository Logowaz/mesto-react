import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
    
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        onUpdateCards({
            name: name,
            link: link,
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
                onChange={handleChangeName}
                value={name || ""}
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
                onChange={handleChangeLink}
                value={link || ""}
            />

            <span 
                id="input-link-error" 
                className="popup__error">
            </span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;