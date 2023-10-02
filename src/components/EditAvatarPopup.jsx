import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ 
    isOpen, 
    onClose, 
    onUpdateAvatar 
    }) 
{
    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
    <div>
        <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
          <input 
            id="input-link-avatar" 
            type="url" 
            name="link" 
            placeholder="Ссылка на картинку" 
            className="form__item form__item_avatar_link" 
            required
            ref={avatarRef}
          />

          <span 
            id="input-link-avatar-error" 
            className="popup__error">
          </span>
        </PopupWithForm>
    </div>
    );
}

export default EditAvatarPopup;