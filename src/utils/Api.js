import {configApi} from "./constants.js"

class Api {
    constructor({headers, url}) {
      this._url = url,
      this._headers = headers;
    }

    #onResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Произошла ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this.#onResponce)
    } 

    //Запросить информацию о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me/`, {
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    //Добавить карточку на сервер
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponce)
    }

    //Записать обновленную информацию о пользователе на сервер
    setUserInfo(data) {
        // console.log(data)
        return fetch(`${this._url}/users/me/`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
            .then(this.#onResponce)
    }

    //Записать обновленный аватар пользователя на сервер
    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })})
            .then(this.#onResponce)
    }

    //Запрос на удаление карточки с сервера
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
            })
            .then(this.#onResponce)
    }

    //Отправка запроса на присвоение лайка
    setLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    // Отправка запроса на удаление лайка
    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
          return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this.#onResponce)
        } else {
          return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(this.#onResponce)
        }
    }
    
}

const api = new Api(configApi)

export default api;