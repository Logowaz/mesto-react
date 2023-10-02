import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete, onConfirmDelete}) {
    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
      }
    
    function handleLikeClick() {
        onCardLike(card);
    }
    
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = ( 
    `elements__button-like ${isLiked && 'elements__button-like_active'}` 
    ); 

    return (
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
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
            {/* <button type="button" className="elements__card-delete"></button> */}
            // Далее в разметке используем переменную для условного рендеринга
            {isOwn && <button className='elements__card-delete' onClick={handleDeleteClick} />}
        </article>
  );
}

export default Card;




