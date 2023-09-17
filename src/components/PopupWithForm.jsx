import React from "react"

function PopupWithForm({name, title, children, textButton, isOpen, onClose}) {

  return (
    <>
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : "" }`}>
        <div className="popup__container">
          <form name="info" className={`form form_${name}`}>
            <h2 className="form__title">{title}</h2>
            {children}
            <button type="submit" className="form__submit">{textButton}</button>
          </form>
          <button type="button" className="popup__button-close" onClick={onClose} ></button>
        </div>
    </div>
    </>
  );
}

export default PopupWithForm;
