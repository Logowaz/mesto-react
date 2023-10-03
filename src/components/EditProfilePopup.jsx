import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    
    const currentUser = useContext(CurrentUserContext); 

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    function handleChangeName(evt) {
    setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({ name, description });
    }

    React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
    <div>
        <PopupWithForm
        name="editprofile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
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
                onChange={handleChangeName}
                value={name || ""}
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
                onChange={handleChangeDescription}
                value={description || ""}
          />

          <span 
                id="input-job-error" 
                className="popup__error">
          </span>
        </PopupWithForm>
    </div>
    );
}

export default EditProfilePopup;