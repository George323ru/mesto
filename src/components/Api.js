export default class Api {
  constructor({
    address,
    token
  }) {
    this.address = address;
    this.token = token;

  }

  _checkingResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }


  getCards() {
    return fetch(`${this.address}/cards`, {
        headers: {
          authorization: this.token
        }
      })
      .then(this._checkingResponse)
  }

  getUserInfo() {
    return fetch(`${this.address}/users/me`, {
        headers: {
          authorization: this.token
        }
      })
      .then(this._checkingResponse)
  }

  patchSaveUserData(name, job) {
    return fetch(`${this.address}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
      .then(this._checkingResponse)
  }

  postAddNewCard(name, link) {
    return fetch(`${this.address}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._checkingResponse)

  }

  deleteCard(cardId) {
    return fetch(`${this.address}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkingResponse)

  }


  putLike(cardId) {
    return fetch(`${this.address}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkingResponse)

  }

  deleteLike(cardId) {
    return fetch(`${this.address}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkingResponse)

  }

  patchUpdateUserAvatar(acceptAvatar) {
    return fetch(`${this.address}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: acceptAvatar
        })
      })
      .then(this._checkingResponse)
  }

}
