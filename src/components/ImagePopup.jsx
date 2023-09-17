import React from "react";

function ImagePopup({ card, isOpen, onClose }) {

  return (
    <div className={`popup popup_popup_opencardfullscreen ${isOpen ? 'popup_opened' : "" }`}>
      <div className="popup__photocontainer">
        <figure className="popup__card-fullscreen">
          <img className="popup__card-photo" src={card.link} alt={card.name} />
          <figcaption className="popup__aboutphoto">
            <p className="popup__card-name">{card.name}</p>
          </figcaption>
        </figure>
        <button type="button" className="popup__button-close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;