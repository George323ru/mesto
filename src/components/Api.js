export default class Api {
  constructor({
    address,
    token
  }) {
    this.address = address;

    this.token = token;
  }


  getCards() {
    return fetch(`${this.address}/cards`, {
        headers: {
          authorization: this.token
        }
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${response.status}`)
        }

      )

  }

  getUserInfo() {
    return fetch(`${this.address}/users/me`, {
        headers: {
          authorization: this.token
        }
      })
      .then(res => {
          if (res.ok) {
            return res.json();

          }
          return Promise.reject(`Ошибка ${response.status}`)
        }

      )
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
    });
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
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    });
  }


  putLike(cardId) {
    return fetch(`${this.address}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    });
  }

  deleteLike(cardId) {
    return fetch(`${this.address}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
    });
  }

  patchUpdateUserAvatar() {
    return fetch(`${this.address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    });
  }

}
