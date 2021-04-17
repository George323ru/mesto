export default class UserInfo {
  constructor(
    data
  ) {

    this._selectorName = document.querySelector(data.name);
    this._selectorJob = document.querySelector(data.job);
    this._ownerId = data.id;
  }

  // Возвращаем объект с данными пользователя
  getUserInfo() {

    return {
      name: this._selectorName.textContent,
      job: this._selectorJob.textContent,
      id: this._ownerId
    };

  }

  // Принимаем новые данные пользователя и добавляем их на страницу
  setUserInfo(
    info
  ) {

    this._selectorName.textContent = info.name;

    this._selectorJob.textContent = info.job;
    this._ownerId = info.id;

  }
}
