import {configApi} from "./constants"

class Api {
    constructor(config) {
      this._url = config.url,
      this._headers = config.headers;
    }

    #onResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Произошла ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(this._url, {
            headers: {
            authorization: 'e01b1331-b93c-4514-b189-6f6d94874ecd'
          }
        })
            .then(this.#onResponce)
    } 

    //Запросить информацию о пользователе с сервера
    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-73/users/me', {
            headers: {authorization: 'e01b1331-b93c-4514-b189-6f6d94874ecd'}
        })
            .then(this.#onResponce)
    }

    //Добавить карточку на сервер
    addCard(data) {
        return fetch(this._url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponce)
    }

    //Записать обновленную информацию о пользователе на сервер
    setUserInfo(data) {
        console.log(data)
        return fetch('https://mesto.nomoreparties.co/v1/cohort-73/users/me/', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
            .then(this.#onResponce)
    }

    //Записать обновленный аватар пользователя на сервер
    setAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-73/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })})
            .then(this.#onResponce)
    }

    //Запрос на удаление карточки с сервера
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-73/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
            })
            .then(this.#onResponce)
    }

    //Отправка запроса на присвоение лайка
    setLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-73/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    // Отправка запроса на удаление лайка
    removeLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-73/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponce)
    }
    
}

const api = new Api(configApi)

export default api;