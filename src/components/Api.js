export default class Api {
  constructor({
    adress,
    token
  }) {
    this.adress = adress;
    this.token = token;
  }


  getCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
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
    return fetch(`${this._address}/users/me`, {
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

  patchSaveUserData() {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    });
  }

  postAddNewCard() {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        link: 'Physicist and Chemist'
      })
    });
  }

  deleteCard() {
    return fetch(`${this._address}/cardId`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        link: 'Physicist and Chemist'
      })
    });
  }

  putLike() {
    return fetch(`${this._address}/cards/likes/cardId`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        link: 'Physicist and Chemist'
      })
    });
  }

  deleteLike() {
    return fetch(`${this._address}/cards/likes/cardId`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        link: 'Physicist and Chemist'
      })
    });
  }

  patchUpdateUserAvatar() {
    return fetch(`${this._address}/users/me/avatar`, {
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
