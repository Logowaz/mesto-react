import React from "react"

function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
    }

  return (
    <li>
        <article className="elements__element">
            <img 
                className="elements__photo"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <div className="elements__caption">
                <h2 className="elements__name">{card.name}</h2>
                <div className="elements__like-place">
                    <button 
                        type="button" 
                        className="elements__button-like">
                    </button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button 
                type="button" 
                className="elements__card-delete">
            </button>
        </article>
    </li>
  );
}

export default Card;




